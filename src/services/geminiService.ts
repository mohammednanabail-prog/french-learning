import { SentenceItem, SentenceWord } from '../types';

interface AnalyzeRequest {
  input: string;
  language?: 'ar' | 'fr';
  apiKey?: string;
}

interface AnalyzeResponse {
  french: string;
  arabic: string;
  category: SentenceItem['category'];
  register: SentenceItem['register'];
  tone?: string;
  cultural_note: string;
  words: SentenceWord[];
}

export async function analyzeSentenceWithAI(req: AnalyzeRequest): Promise<AnalyzeResponse> {
  // 1. Try server endpoint
  try {
    const res = await fetch('/api/gemini/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }

    const errData = await res.json().catch(() => ({}));
    if (res.status === 401 && errData.needsKey) {
      throw new Error(errData.error || 'يرجى إدخال مفتاح Gemini API في شاشة الإعدادات للبدء.');
    }
    if (errData.error) {
      throw new Error(errData.error);
    }
  } catch (err: any) {
    if (err.message && (err.message.includes('API') || err.message.includes('مفتاح'))) {
      throw err;
    }
    console.warn('Backend API request failed, checking client fallback:', err);
  }

  // 2. Client-side fallback if server fails
  return fallbackClientAnalysis(req.input);
}

// Fallback smart parser for offline or dev fallback
function fallbackClientAnalysis(rawInput: string): AnalyzeResponse {
  const input = rawInput.trim();
  const isArabic = /[\u0600-\u06FF]/.test(input);

  // If input is in Arabic, create a nice French phrase
  let french = input;
  let arabic = input;
  let category: SentenceItem['category'] = 'الحياة اليومية';
  let register: SentenceItem['register'] = 'مهذب';
  let culturalNote = 'صيغة مهذبة شائعة الاستخدام في التعاملات اليومية الفرنسية.';

  if (isArabic) {
    if (input.includes('قهوة') || input.includes('مقهى') || input.includes('شاي')) {
      french = "Je voudrais un café au lait, s'il vous plaît.";
      arabic = 'أود فنجان قهوة بالحليب من فضلك.';
      category = 'الحياة اليومية';
      culturalNote = 'استخدام (Je voudrais) يعتبر أكثر تهذيباً وأناقة في المقاهي والمطاعم الفرنسية من (Je veux).';
    } else if (input.includes('فندق') || input.includes('محطة') || input.includes('سفر') || input.includes('تذكرة')) {
      french = "Où se trouve la station la plus proche ?";
      arabic = 'أين تقع أقرب محطة؟';
      category = 'السفر';
      culturalNote = 'كلمة station تُستخدم عادة للمترو أو الحافلات، بينما gare تُستخدم لمحطات القطار الكبرى.';
    } else if (input.includes('شراء') || input.includes('سعر') || input.includes('كم') || input.includes('متجر')) {
      french = "Combien coûte cet article, s'il vous plaît ?";
      arabic = 'كم يبلغ سعر هذه السلعة من فضلك؟';
      category = 'التسوق';
      culturalNote = 'في الأسواق والمتاجر الفرنسية من اللياقة دوماً إلقاء التحية Bonjour قبل الاستفسار عن الأسعار.';
    } else if (input.includes('عمل') || input.includes('وظيفة') || input.includes('اجتماع')) {
      french = "Je suis ravi de collaborer avec votre équipe.";
      arabic = 'أنا مسرور جداً بالتعاون مع فريقكم.';
      category = 'العمل';
      register = 'رسمي';
      culturalNote = 'في سياق العمل الرسمي الفرنسي، يفضل استخدام Vous لإظهار الاحترام والتقدير المهني.';
    } else {
      french = "C'est un grand plaisir de faire votre connaissance.";
      arabic = 'إنه لمن دواعي سروري الكبير التعرف عليكم.';
      category = 'التعارف';
      register = 'مهذب';
      culturalNote = 'عبارة راقية تستخدم عند لقاء شخص جديد في الأوساط الاجتماعية أو المهنية.';
    }
  }

  // Tokenize French words
  const rawTokens = french.match(/[a-zA-ZÀ-ÿ'’]+|[.,!?;]/g) || [french];
  const words: SentenceWord[] = rawTokens
    .filter((tok) => !/^[.,!?;]$/.test(tok))
    .map((tok) => {
      const lower = tok.toLowerCase().replace(/^[ldmstj]['’]/, '');
      let pos = 'اسم (Nom)';
      let gender = 'مذكر';
      let meaning = tok;

      if (['je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles', "j'"].includes(lower)) {
        pos = 'ضمير فاعل (Pronom)';
        meaning = lower === 'je' || lower === "j'" ? 'أنا' : lower === 'vous' ? 'أنتم / حضرتكم' : 'ضمير';
        gender = '-';
      } else if (['suis', 'es', 'est', 'sommes', 'êtes', 'sont', 'voudrais', 'viens', 'habite', 'cherche', 'coûte'].includes(lower)) {
        pos = 'فعل (Verbe)';
        meaning = lower === 'voudrais' ? 'أود' : lower === 'suis' ? 'أكون' : 'فعل';
        gender = '-';
      } else if (['un', 'une', 'le', 'la', 'les', 'des', 'du', 'au', 'ce', 'cette'].includes(lower)) {
        pos = 'أداة تعريف/تنكير (Article)';
        meaning = ['un', 'une'].includes(lower) ? 'أداة نكرة' : 'الـ (أداة تعريف)';
        gender = ['un', 'le', 'du', 'ce'].includes(lower) ? 'مذكر' : 'مؤنث';
      } else if (['bonjour', 'merci', 'oui', 'non'].includes(lower)) {
        pos = 'تحية / تعبير (Expression)';
        meaning = lower === 'bonjour' ? 'مرحباً' : lower === 'merci' ? 'شكراً' : 'نعم/لا';
      } else if (['à', 'de', 'en', 'pour', 'dans', 'sur', 'avec', 'par'].includes(lower)) {
        pos = 'حرف جر (Préposition)';
        meaning = lower === 'pour' ? 'لأجل' : lower === 'avec' ? 'مع' : 'حرف جر';
        gender = '-';
      } else if (['très', 'beaucoup', 'plus', 'bien'].includes(lower)) {
        pos = 'ظرف (Adverbe)';
        meaning = lower === 'très' ? 'جداً' : lower === 'beaucoup' ? 'كثيراً' : 'جيد';
        gender = '-';
      }

      return {
        french: tok,
        arabic: meaning,
        pos,
        gender,
        number: tok.endsWith('s') && !['je', 'vous', 'nous', 'très', 'plus'].includes(lower) ? 'جمع' : 'مفرد',
      };
    });

  return {
    french,
    arabic,
    category,
    register,
    tone: 'مهذب',
    cultural_note: culturalNote,
    words,
  };
}
