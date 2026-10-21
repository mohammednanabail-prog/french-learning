import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Server-side Gemini client helper
function getGeminiClient(customApiKey?: string) {
  const key = customApiKey || process.env.GEMINI_API_KEY;
  if (!key) {
    return null;
  }
  return new GoogleGenAI({
    apiKey: key,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// POST /api/gemini/analyze
app.post('/api/gemini/analyze', async (req, res) => {
  try {
    const { input, language, apiKey } = req.body;

    if (!input || typeof input !== 'string' || !input.trim()) {
      return res.status(400).json({ error: 'الرجاء إدخال نص أو جملة للتحليل.' });
    }

    const ai = getGeminiClient(apiKey);
    if (!ai) {
      return res.status(401).json({
        error: 'لم يتم العثور على مفتاح Gemini API. يرجى إدخال مفتاح API في الإعدادات.',
        needsKey: true,
      });
    }

    const systemInstruction = `
أنت خبير لغوي متخصص في تعليم اللغة الفرنسية للناطقين باللغة العربية.
مهمتك:
1. إذا كان النص المدخل بالعربية، قم بترجمته وصياغته كجملة فرنسية طبيعية وأصلية (French native sentence).
2. إذا كان النص المدخل بالفرنسية، صحح أية أخطاء نحوية واشرحه بدقة مع تقديم ترجمة عربية طبيعية فصيحة.
3. فكك الجملة الفرنسية كلمة بكلمة إلى عناصرها الأساسية بدقة:
   - الكلمة بالفرنسية (بدون علامات الترقيم إلا إذا كانت ملتصقة مثل l', d', m', s')
   - المعنى العربي الدقيق للكلمة في سياق الجملة
   - التصنيف النحوي بالعربية والفرنسية (مثل: اسم (Nom), فعل (Verbe), ضمير (Pronom), صفة (Adjectif), أداة تعريف/تنكير (Déterminant/Article), حرف جر (Préposition), ظرف (Adverbe), تعبير (Expression))
   - الجنس (مذكر / مؤنث / -)
   - العدد (مفرد / جمع / -)
4. حدد مستوى التخاطب (رسمي، ودي، مهذب، عامي).
5. حدد النبرة والسياق الاجتماعي.
6. قدم ملاحظة ثقافية أو نحوية مفيدة ومبسطة للمتعلم العربي (مثل متى نستخدم Tu مقابل Vous، أو قاعدة نطق Liaisons، أو سياق استخدام العبارة في فرنسا).
7. حدد الفئة الأنسب من بين: "الحياة اليومية", "التسوق", "السفر", "العمل", "التعارف".
أرجع النتيجة بصيغة JSON متطابقة تماماً مع المخطط.
`;

    const promptText = `
حلل العبارة أو الفكرة التالية لمتعلم فرنسي ناطق بالعربية:
"${input.trim()}"
${language ? `(لغة الإدخال المفضلة: ${language === 'ar' ? 'عربي' : 'فرنسي'})` : ''}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            french: {
              type: Type.STRING,
              description: 'The polished, authentic French sentence.',
            },
            arabic: {
              type: Type.STRING,
              description: 'Accurate, natural Arabic translation.',
            },
            category: {
              type: Type.STRING,
              description: 'One of: الحياة اليومية, التسوق, السفر, العمل, التعارف',
            },
            register: {
              type: Type.STRING,
              description: 'Register level: رسمي, مهذب, ودي, عامي',
            },
            tone: {
              type: Type.STRING,
              description: 'Tone description e.g. مهذب, رسمي, عفوي, يومي',
            },
            cultural_note: {
              type: Type.STRING,
              description: 'Educational, cultural, or grammatical note in Arabic.',
            },
            words: {
              type: Type.ARRAY,
              description: 'Word-by-word breakdown.',
              items: {
                type: Type.OBJECT,
                properties: {
                  french: { type: Type.STRING },
                  arabic: { type: Type.STRING },
                  pos: { type: Type.STRING, description: 'Grammatical part of speech in Arabic and French' },
                  gender: { type: Type.STRING, description: 'مذكر, مؤنث, or -' },
                  number: { type: Type.STRING, description: 'مفرد, جمع, or -' },
                },
                required: ['french', 'arabic', 'pos'],
              },
            },
          },
          required: ['french', 'arabic', 'category', 'register', 'cultural_note', 'words'],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('لم يتم استلام نص من نموذج الذكاء الاصطناعي');
    }

    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error analyzing sentence with Gemini:', error);
    return res.status(500).json({
      error: error?.message || 'حدث خطأ أثناء معالجة الجملة بواسطة الذكاء الاصطناعي.',
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`French Learning App Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
