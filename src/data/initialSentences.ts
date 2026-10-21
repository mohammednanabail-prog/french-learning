import { SentenceItem } from '../types';

export const INITIAL_SENTENCES: SentenceItem[] = [
  // --- 1. الحياة اليومية (Daily Life) ---
  {
    id: 'daily-1',
    french: "Bonjour, je m'appelle Mohamed.",
    arabic: "مرحباً، اسمي محمد.",
    category: 'الحياة اليومية',
    register: 'ودي',
    tone: 'ودي وعفوي',
    cultural_note: "تُستخدم صيغة (je) للحديث عن النفس مع الأصدقاء والأشخاص في نفس العمر، بينما تُستخدم (vous) في المواقف الرسمية والمحترمة.",
    words: [
      { french: "Bonjour", arabic: "مرحباً / صباح الخير", pos: "اسم تحية (Salutation)", gender: "مذكر", number: "مفرد" },
      { french: "je", arabic: "أنا", pos: "ضمير فاعل (Pronom sujet)", gender: "-", number: "مفرد" },
      { french: "m'appelle", arabic: "أُدعى / أُسمى", pos: "فعل انعكاسي (Verbe pronominal)", gender: "-", number: "مفرد" },
      { french: "Mohamed", arabic: "محمد", pos: "اسم علم (Nom propre)", gender: "مذكر", number: "مفرد" }
    ]
  },
  {
    id: 'daily-2',
    french: "Comment allez-vous aujourd'hui ?",
    arabic: "كيف حالكم اليوم؟",
    category: 'الحياة اليومية',
    register: 'رسمي',
    tone: 'مهذب واحترامي',
    cultural_note: "صيغة الجمع (allez-vous) هنا تعبر عن الاحترام (Vouvoiement) لشخص واحد أو توجيه السؤال لمجموعة أشخاص.",
    words: [
      { french: "Comment", arabic: "كيف", pos: "اسم استفهام (Adverbe interrogatif)", gender: "-", number: "-" },
      { french: "allez", arabic: "تذهبون / حالكم", pos: "فعل (Verbe aller)", gender: "-", number: "جمع" },
      { french: "vous", arabic: "أنتم / حضرتك", pos: "ضمير مخاطب (Pronom)", gender: "-", number: "جمع/احترام" },
      { french: "aujourd'hui", arabic: "اليوم", pos: "ظرف زمان (Adverbe de temps)", gender: "-", number: "-" }
    ]
  },
  {
    id: 'daily-3',
    french: "Je voudrais un café noir, s'il vous plaît.",
    arabic: "أود فنجان قهوة سوداء، من فضلك.",
    category: 'الحياة اليومية',
    register: 'مهذب',
    tone: 'مهذب ولطيف',
    cultural_note: "استخدام صيغة الشرط (Je voudrais) بدلاً من الحاضر (Je veux) يعبر عن قمة اللباقة والتهذيب في الطلب الفرنسي اليومي.",
    words: [
      { french: "Je", arabic: "أنا", pos: "ضمير (Pronom)", gender: "-", number: "مفرد" },
      { french: "voudrais", arabic: "أودّ / أرغب", pos: "فعل في صيغة الشرط (Conditionnel)", gender: "-", number: "مفرد" },
      { french: "un", arabic: "واحد / أداة تنكير", pos: "أداة نكرة (Article indéfini)", gender: "مذكر", number: "مفرد" },
      { french: "café", arabic: "قهوة", pos: "اسم (Nom)", gender: "مذكر", number: "مفرد" },
      { french: "noir", arabic: "سوداء", pos: "صفة (Adjectif)", gender: "مذكر", number: "مفرد" },
      { french: "s'il", arabic: "لو كان", pos: "حرف شرط مدغم (Conjonction)", gender: "-", number: "-" },
      { french: "vous", arabic: "لكم / لحضرتكم", pos: "ضمير مفعول به (Pronom)", gender: "-", number: "جمع" },
      { french: "plaît", arabic: "يعجب / يروق", pos: "فعل (Verbe plaire)", gender: "-", number: "مفرد" }
    ]
  },
  {
    id: 'daily-4',
    french: "Il fait très beau aujourd'hui.",
    arabic: "الطقس جميل جداً اليوم.",
    category: 'الحياة اليومية',
    register: 'ودي',
    tone: 'عفوي ومبهج',
    cultural_note: "في الفرنسية يُستخدم التعبير غير الشخصي (Il fait) للتحدث عن حالة الطقس، مثل: Il fait froid (الجو بارد)، Il fait chaud (الجو حار).",
    words: [
      { french: "Il", arabic: "هو (ضمير غير شخصي)", pos: "ضمير (Pronom impersonnel)", gender: "مذكر", number: "مفرد" },
      { french: "fait", arabic: "يصنع / يكون الطقس", pos: "فعل (Verbe faire)", gender: "-", number: "مفرد" },
      { french: "très", arabic: "جداً", pos: "ظرف توكيد (Adverbe)", gender: "-", number: "-" },
      { french: "beau", arabic: "جميل", pos: "صفة (Adjectif)", gender: "مذكر", number: "مفرد" },
      { french: "aujourd'hui", arabic: "اليوم", pos: "ظرف زمان (Adverbe de temps)", gender: "-", number: "-" }
    ]
  },
  {
    id: 'daily-5',
    french: "Je me réveille à sept heures du matin.",
    arabic: "أستيقظ في الساعة السابعة صباحاً.",
    category: 'الحياة اليومية',
    register: 'ودي',
    tone: 'روتيني يومي',
    cultural_note: "الفعل (se réveiller) فعل ذو ضميرين ينتهي بـ er ويعبر عن الاستيقاظ، بينما (se lever) يعني النهوض الفعلي من الفراش.",
    words: [
      { french: "Je", arabic: "أنا", pos: "ضمير (Pronom)", gender: "-", number: "مفرد" },
      { french: "me réveille", arabic: "أستيقظ", pos: "فعل انعكاسي (Verbe pronominal)", gender: "-", number: "مفرد" },
      { french: "à", arabic: "في", pos: "حرف جر (Préposition)", gender: "-", number: "-" },
      { french: "sept", arabic: "سبع", pos: "عدد (Nombre cardinal)", gender: "-", number: "جمع" },
      { french: "heures", arabic: "ساعات", pos: "اسم (Nom)", gender: "مؤنث", number: "جمع" },
      { french: "du", arabic: "من الـ", pos: "أداة إدغام (Article contracté)", gender: "مذكر", number: "مفرد" },
      { french: "matin", arabic: "الصباح", pos: "اسم (Nom)", gender: "مذكر", number: "مفرد" }
    ]
  },
  {
    id: 'daily-6',
    french: "Où se trouvent mes clés de maison ?",
    arabic: "أين توجد مفاتيح منزلي؟",
    category: 'الحياة اليومية',
    register: 'عامي',
    tone: 'تساؤل يومي',
    cultural_note: "كلمة (clé) تُجمع بإضافة s (clés) وتُلفظ بنفس الطريقة، وحرف s في نهاية الكلمات الفرنسية غالباً لا يُنطق.",
    words: [
      { french: "Où", arabic: "أين", pos: "أداة استفهام (Adverbe)", gender: "-", number: "-" },
      { french: "se trouvent", arabic: "توجد / تتواجد", pos: "فعل انعكاسي (Verbe)", gender: "-", number: "جمع" },
      { french: "mes", arabic: "لي / ملكي", pos: "صفة ملكية للجمع (Adjectif possessif)", gender: "-", number: "جمع" },
      { french: "clés", arabic: "مفاتيح", pos: "اسم (Nom)", gender: "مؤنث", number: "جمع" },
      { french: "de", arabic: "لـ / خاص بـ", pos: "حرف جر (Préposition)", gender: "-", number: "-" },
      { french: "maison", arabic: "منزل / بيت", pos: "اسم (Nom)", gender: "مؤنث", number: "مفرد" }
    ]
  },

  // --- 2. التسوق (Shopping) ---
  {
    id: 'shop-1',
    french: "Combien coûte cette chemise blanche ?",
    arabic: "كم سعر هذا القميص الأبيض؟",
    category: 'التسوق',
    register: 'مهذب',
    tone: 'استفسار شرائي',
    cultural_note: "في الفرنسية تتبع الصفة (blanche) الاسم وتتطابق معه في التأنيث والتذكير؛ كلمة chemise مؤنثة لذا أخذت blanche بدلاً من blanc.",
    words: [
      { french: "Combien", arabic: "كم", pos: "أداة استفهام للكمية (Adverbe)", gender: "-", number: "-" },
      { french: "coûte", arabic: "يكلّف / يبلغ سعره", pos: "فعل (Verbe coûter)", gender: "-", number: "مفرد" },
      { french: "cette", arabic: "هذه", pos: "اسم إشارة للمؤنث (Adjectif démonstratif)", gender: "مؤنث", number: "مفرد" },
      { french: "chemise", arabic: "قميص", pos: "اسم (Nom)", gender: "مؤنث", number: "مفرد" },
      { french: "blanche", arabic: "بيضاء", pos: "صفة لون مؤنثة (Adjectif)", gender: "مؤنث", number: "مفرد" }
    ]
  },
  {
    id: 'shop-2',
    french: "Avez-vous une taille plus grande ?",
    arabic: "هل لديكم مقاس أكبر؟",
    category: 'التسوق',
    register: 'رسمي',
    tone: 'مهذب للمتاجر',
    cultural_note: "في المتاجر الفرنسية كلمة (taille) تُستخدم لمقاس الملابس، بينما للأحذية يُقال غالباً (pointure).",
    words: [
      { french: "Avez", arabic: "هل تملكون / لديكم", pos: "فعل يملك (Verbe avoir)", gender: "-", number: "جمع" },
      { french: "vous", arabic: "أنتم / حضرتكم", pos: "ضمير (Pronom)", gender: "-", number: "جمع" },
      { french: "une", arabic: "واحدة (أداة نكرة)", pos: "أداة نكرة (Article indéfini)", gender: "مؤنث", number: "مفرد" },
      { french: "taille", arabic: "مقاس / حجم", pos: "اسم (Nom)", gender: "مؤنث", number: "مفرد" },
      { french: "plus", arabic: "أكثر", pos: "ظرف مقارنة (Adverbe)", gender: "-", number: "-" },
      { french: "grande", arabic: "كبيرة", pos: "صفة (Adjectif)", gender: "مؤنث", number: "مفرد" }
    ]
  },
  {
    id: 'shop-3',
    french: "Je voudrais payer par carte bancaire.",
    arabic: "أود الدفع بالبطاقة المصرفية.",
    category: 'التسوق',
    register: 'مهذب',
    tone: 'معاملة مالية',
    cultural_note: "في فرنسا يُختصر مصطلح البطاقة البنكية عادةً بـ 'carte bleue' أو 'CB' وتُنطق (سي بي).",
    words: [
      { french: "Je", arabic: "أنا", pos: "ضمير (Pronom)", gender: "-", number: "مفرد" },
      { french: "voudrais", arabic: "أودّ", pos: "فعل (Verbe conditionnel)", gender: "-", number: "مفرد" },
      { french: "payer", arabic: "أن أدفع", pos: "فعل في المصدر (Verbe infinitif)", gender: "-", number: "-" },
      { french: "par", arabic: "بواسطة / عبر", pos: "حرف جر (Préposition)", gender: "-", number: "-" },
      { french: "carte", arabic: "بطاقة", pos: "اسم (Nom)", gender: "مؤنث", number: "مفرد" },
      { french: "bancaire", arabic: "مصرفية / بنكية", pos: "صفة (Adjectif)", gender: "مؤنث", number: "مفرد" }
    ]
  },
  {
    id: 'shop-4',
    french: "Est-ce qu'il y a des soldes actuellement ?",
    arabic: "هل توجد تخفيضات حالياً؟",
    category: 'التسوق',
    register: 'ودي',
    tone: 'استفسار عروض',
    cultural_note: "موسم التخفيضات (Les Soldes) في فرنسا يخضع لرقابة قانونية رسمية ويكون مرتين في السنة: الشتاء والصيف.",
    words: [
      { french: "Est-ce que", arabic: "هل", pos: "صيغة استفهام مركبة (Locution interrogative)", gender: "-", number: "-" },
      { french: "il y a", arabic: "يوجد / هناك", pos: "تعبير وجودي (Expression impersonnelle)", gender: "-", number: "-" },
      { french: "des", arabic: "بعض / أداة جمع", pos: "أداة نكرة للجمع (Article)", gender: "-", number: "جمع" },
      { french: "soldes", arabic: "تخفيضات / تنزيلات", pos: "اسم (Nom)", gender: "مذكر", number: "جمع" },
      { french: "actuellement", arabic: "حالياً / في الوقت الراهن", pos: "ظرف زمان (Adverbe)", gender: "-", number: "-" }
    ]
  },
  {
    id: 'shop-5',
    french: "Puis-je essayer cette veste en cabine ?",
    arabic: "هل يمكنني تجربة هذه السترة في غرفة القياس؟",
    category: 'التسوق',
    register: 'رسمي',
    tone: 'مهذب وأنيق',
    cultural_note: "صيغة (Puis-je) هي الصيغة الفصحى الراقية المعكوسة للفعل Pouvoir، ويمكن استخدامها ببديل ودي: (Est-ce que je peux essayer...).",
    words: [
      { french: "Puis-je", arabic: "هل أستطيع أنا", pos: "فعل pouvoir مع ضمير مقلوب (Inversion)", gender: "-", number: "مفرد" },
      { french: "essayer", arabic: "أن أجرّب / أقيس", pos: "فعل في المصدر (Infinitif)", gender: "-", number: "-" },
      { french: "cette", arabic: "هذه", pos: "اسم إشارة (Adjectif démonstratif)", gender: "مؤنث", number: "مفرد" },
      { french: "veste", arabic: "سترة / جاكيت", pos: "اسم (Nom)", gender: "مؤنث", number: "مفرد" },
      { french: "en", arabic: "في", pos: "حرف جر (Préposition)", gender: "-", number: "-" },
      { french: "cabine", arabic: "غرفة القياس", pos: "اسم (Nom)", gender: "مؤنث", number: "مفرد" }
    ]
  },
  {
    id: 'shop-6',
    french: "Gardez la monnaie, merci !",
    arabic: "احتفظ بالباقي، شكراً!",
    category: 'التسوق',
    register: 'ودي',
    tone: 'شكر وكرم',
    cultural_note: "كلمة (monnaie) تعني فكة أو باقي النقود الورقية والمعدنية بعد دفع الحساب في مقهى أو سيارة أجرة.",
    words: [
      { french: "Gardez", arabic: "احتفظوا / احتفظ", pos: "فعل أمر (Impératif)", gender: "-", number: "جمع/احترام" },
      { french: "la", arabic: "الـ (معرفة للمؤنث)", pos: "أداة تعريف (Article défini)", gender: "مؤنث", number: "مفرد" },
      { french: "monnaie", arabic: "الباقي / الفكة", pos: "اسم (Nom)", gender: "مؤنث", number: "مفرد" },
      { french: "merci", arabic: "شكراً", pos: "كلمة شكر (Interjection)", gender: "-", number: "-" }
    ]
  },

  // --- 3. السفر (Travel) ---
  {
    id: 'travel-1',
    french: "Où est la gare ferroviaire la plus proche ?",
    arabic: "أين أقرب محطة قطار؟",
    category: 'السفر',
    register: 'مهذب',
    tone: 'استفسار للمسافرين',
    cultural_note: "شبكة القطارات في فرنسا (SNCF) تعد الشريان الأساسي للتنقل بين المدن، ومصطلح (gare) يخص القطار، بينما (station) للمترو.",
    words: [
      { french: "Où", arabic: "أين", pos: "اسم استفهام (Adverbe)", gender: "-", number: "-" },
      { french: "est", arabic: "تكون / تقع", pos: "فعل être (Verbe)", gender: "-", number: "مفرد" },
      { french: "la", arabic: "الـ", pos: "أداة تعريف (Article défini)", gender: "مؤنث", number: "مفرد" },
      { french: "gare", arabic: "محطة قطار", pos: "اسم (Nom)", gender: "مؤنث", number: "مفرد" },
      { french: "ferroviaire", arabic: "حديدية / قطارات", pos: "صفة (Adjectif)", gender: "مؤنث", number: "مفرد" },
      { french: "la plus", arabic: "الأكثر", pos: "صيغة تفضيل (Superlatif)", gender: "مؤنث", number: "مفرد" },
      { french: "proche", arabic: "قرباً / القريبة", pos: "صفة (Adjectif)", gender: "مؤنث", number: "مفرد" }
    ]
  },
  {
    id: 'travel-2',
    french: "Je cherche un bon hôtel pas trop cher.",
    arabic: "أبحث عن فندق جيد وغير مكلف كثيراً.",
    category: 'السفر',
    register: 'ودي',
    tone: 'بحث عملي',
    cultural_note: "في النطق الفرنسي، حرف h في كلمة (hôtel) صامت تماماً وتحدث ظاهرة الإدغام الصوتي (Liaison): un_hôtel تُنطق كأنها كلمة واحدة.",
    words: [
      { french: "Je", arabic: "أنا", pos: "ضمير (Pronom)", gender: "-", number: "مفرد" },
      { french: "cherche", arabic: "أبحث عن", pos: "فعل (Verbe chercher)", gender: "-", number: "مفرد" },
      { french: "un", arabic: "واحد / أداة تنكير", pos: "أداة نكرة (Article indéfini)", gender: "مذكر", number: "مفرد" },
      { french: "bon", arabic: "جيد / طيب", pos: "صفة (Adjectif)", gender: "مذكر", number: "مفرد" },
      { french: "hôtel", arabic: "فندق", pos: "اسم (Nom)", gender: "مذكر", number: "مفرد" },
      { french: "pas", arabic: "ليس / غير", pos: "أداة نفي (Adverbe de négation)", gender: "-", number: "-" },
      { french: "trop", arabic: "مفرط / كثيراً", pos: "ظرف مقدار (Adverbe)", gender: "-", number: "-" },
      { french: "cher", arabic: "غالٍ / باهظ", pos: "صفة (Adjectif)", gender: "مذكر", number: "مفرد" }
    ]
  },
  {
    id: 'travel-3',
    french: "Je suis perdu, pouvez-vous m'aider ?",
    arabic: "أنا تائه، هل يمكنك مساعدتي؟",
    category: 'السفر',
    register: 'مهذب',
    tone: 'طلب نجدة مهذب',
    cultural_note: "إذا كانت المتحدثة أنثى، يُكتب النعت (perdue) بإضافة e في النهاية تماشياً مع قواعد مطابقة الصفات.",
    words: [
      { french: "Je", arabic: "أنا", pos: "ضمير (Pronom)", gender: "-", number: "مفرد" },
      { french: "suis", arabic: "أكون", pos: "فعل être (Verbe)", gender: "-", number: "مفرد" },
      { french: "perdu", arabic: "تائه / ضائع", pos: "اسم مفعول/صفة (Participe passé)", gender: "مذكر", number: "مفرد" },
      { french: "pouvez", arabic: "هل بإمكانكم", pos: "فعل pouvoir (Verbe)", gender: "-", number: "جمع" },
      { french: "vous", arabic: "أنتم / حضرتك", pos: "ضمير مخاطب (Pronom)", gender: "-", number: "جمع" },
      { french: "m'aider", arabic: "مساعدتي", pos: "ضمير مفعول + فعل في المصدر (Infinitif)", gender: "-", number: "-" }
    ]
  },
  {
    id: 'travel-4',
    french: "Un aller-retour pour Paris, s'il vous plaît.",
    arabic: "تذكرة ذهاب وإياب إلى باريس، من فضلك.",
    category: 'السفر',
    register: 'رسمي',
    tone: 'حجز تذاكر',
    cultural_note: "تذكرة الذهاب فقط تُسمى (aller simple)، بينما تذكرة الذهاب والعودة تُسمى (aller-retour).",
    words: [
      { french: "Un", arabic: "تذكرة واحدة", pos: "أداة نكرة (Article indéfini)", gender: "مذكر", number: "مفرد" },
      { french: "aller-retour", arabic: "ذهاب وإياب", pos: "اسم مركب (Nom composé)", gender: "مذكر", number: "مفرد" },
      { french: "pour", arabic: "إلى / لـ", pos: "حرف جر (Préposition)", gender: "-", number: "-" },
      { french: "Paris", arabic: "باريس", pos: "اسم علم لمكان (Nom propre)", gender: "مؤنث", number: "مفرد" },
      { french: "s'il vous plaît", arabic: "من فضلكم", pos: "عبارة مجاملة (Locution de politesse)", gender: "-", number: "-" }
    ]
  },
  {
    id: 'travel-5',
    french: "Quel est le mot de passe du réseau Wi-Fi ?",
    arabic: "ما هي كلمة سر شبكة الواي فاي؟",
    category: 'السفر',
    register: 'ودي',
    tone: 'استفسار رقمي',
    cultural_note: "في فرنسا يُنطق (Wi-Fi) بصوت 'وي-في' وليس 'واي-فاي' كما في الإنجليزية.",
    words: [
      { french: "Quel", arabic: "ما / أي", pos: "اسم استفهام للمذكر (Adjectif interrogatif)", gender: "مذكر", number: "مفرد" },
      { french: "est", arabic: "هو / يكون", pos: "فعل (Verbe être)", gender: "-", number: "مفرد" },
      { french: "le", arabic: "الـ", pos: "أداة تعريف (Article défini)", gender: "مذكر", number: "مفرد" },
      { french: "mot de passe", arabic: "كلمة المرور / السر", pos: "اسم مركب (Nom composé)", gender: "مذكر", number: "مفرد" },
      { french: "du", arabic: "لـ", pos: "حرف جر مدمج (Article contracté)", gender: "مذكر", number: "مفرد" },
      { french: "réseau", arabic: "شبكة", pos: "اسم (Nom)", gender: "مذكر", number: "مفرد" },
      { french: "Wi-Fi", arabic: "واي فاي", pos: "اسم (Nom)", gender: "مذكر", number: "مفرد" }
    ]
  },

  // --- 4. العمل (Work & Professional) ---
  {
    id: 'work-1',
    french: "Enchanté de faire votre connaissance pour cet entretien.",
    arabic: "تشرفت بمعرفتكم لهذه المقابلة الشخصية.",
    category: 'العمل',
    register: 'رسمي',
    tone: 'مهني رفيع المستوى',
    cultural_note: "في بيئة العمل الفرنسية، تبدأ المقابلات الرسمية دائماً بعبارة (Enchanté de faire votre connaissance) مع مصافحة واثقة والتواصل البصري المباشر.",
    words: [
      { french: "Enchanté", arabic: "تشرّفت / مسرور جداً", pos: "صفة ترحيبية (Adjectif)", gender: "مذكر", number: "مفرد" },
      { french: "de faire", arabic: "بصنع / بإجراء", pos: "حرف جر + مصدر (Infinitif)", gender: "-", number: "-" },
      { french: "votre", arabic: "حضرتكم / لسيادتكم", pos: "صفة ملكية للاحترام (Adjectif possessif)", gender: "-", number: "مفرد" },
      { french: "connaissance", arabic: "معرفة / لقاء", pos: "اسم (Nom)", gender: "مؤنث", number: "مفرد" },
      { french: "pour", arabic: "لأجل / من أجل", pos: "حرف جر (Préposition)", gender: "-", number: "-" },
      { french: "cet", arabic: "هذا", pos: "اسم إشارة مذكر قبل حرف متحرك (Adjectif démonstratif)", gender: "مذكر", number: "مفرد" },
      { french: "entretien", arabic: "مقابلة عمل", pos: "اسم (Nom)", gender: "مذكر", number: "مفرد" }
    ]
  },
  {
    id: 'work-2',
    french: "Nous devons fixer une réunion demain matin.",
    arabic: "يجب علينا تحديد موعد اجتماع صباح الغد.",
    category: 'العمل',
    register: 'رسمي',
    tone: 'تنسيق مهام',
    cultural_note: "فعل (devoir) يعبر عن الالتزام أو الضرورة. في الاجتماعات الفرنسية يُفضل دائماً تحديد جدول أعمال واضح (ordre du jour).",
    words: [
      { french: "Nous", arabic: "نحن", pos: "ضمير فاعل (Pronom sujet)", gender: "-", number: "جمع" },
      { french: "devons", arabic: "يجب علينا", pos: "فعل (Verbe devoir)", gender: "-", number: "جمع" },
      { french: "fixer", arabic: "تحديد / تثبيت", pos: "فعل في المصدر (Infinitif)", gender: "-", number: "-" },
      { french: "une", arabic: "واحدة", pos: "أداة نكرة (Article indéfini)", gender: "مؤنث", number: "مفرد" },
      { french: "réunion", arabic: "اجتماع", pos: "اسم (Nom)", gender: "مؤنث", number: "مفرد" },
      { french: "demain", arabic: "غداً", pos: "ظرف زمان (Adverbe)", gender: "-", number: "-" },
      { french: "matin", arabic: "صباحاً", pos: "اسم (Nom)", gender: "مذكر", number: "مفرد" }
    ]
  },
  {
    id: 'work-3',
    french: "J'ai envoyé le rapport financier par e-mail.",
    arabic: "أرسلت التقرير المالي عبر البريد الإلكتروني.",
    category: 'العمل',
    register: 'رسمي',
    tone: 'إبلاغ رسمي',
    cultural_note: "الزمن هنا هو الماضي المركب (Passé composé)، ويتكون من الفعل المساعد (avoir) متبوعاً باسم المفعول (envoyé).",
    words: [
      { french: "J'ai", arabic: "لقد قمت بـ", pos: "ضمير + فعل avoir مساعد (Auxiliaire)", gender: "-", number: "مفرد" },
      { french: "envoyé", arabic: "أرسلتُ", pos: "اسم مفعول (Participe passé)", gender: "مذكر", number: "مفرد" },
      { french: "le", arabic: "الـ", pos: "أداة تعريف (Article défini)", gender: "مذكر", number: "مفرد" },
      { french: "rapport", arabic: "تقرير", pos: "اسم (Nom)", gender: "مذكر", number: "مفرد" },
      { french: "financier", arabic: "مالي", pos: "صفة (Adjectif)", gender: "مذكر", number: "مفرد" },
      { french: "par", arabic: "عبر / بواسطة", pos: "حرف جر (Préposition)", gender: "-", number: "-" },
      { french: "e-mail", arabic: "البريد الإلكتروني", pos: "اسم مقتبس (Nom)", gender: "مذكر", number: "مفرد" }
    ]
  },
  {
    id: 'work-4',
    french: "Merci pour votre précieuse collaboration.",
    arabic: "شكراً لتعاونكم القيّم والمثمر.",
    category: 'العمل',
    register: 'مهذب',
    tone: 'تقدير واحترام',
    cultural_note: "هذه الجملة شائعة جداً في نهاية الرسائل الإلكترونية المهنية والخطابات الرسمية لإظهار الامتنان والاحترافية.",
    words: [
      { french: "Merci", arabic: "شكراً", pos: "شكر (Remerciement)", gender: "-", number: "-" },
      { french: "pour", arabic: "لـ / على", pos: "حرف جر (Préposition)", gender: "-", number: "-" },
      { french: "votre", arabic: "حضرتكم / خاصتكم", pos: "صفة ملكية (Adjectif possessif)", gender: "-", number: "مفرد" },
      { french: "précieuse", arabic: "القيّمة / الثمينة", pos: "صفة مؤنثة (Adjectif)", gender: "مؤنث", number: "مفرد" },
      { french: "collaboration", arabic: "تعاون / شراكة", pos: "اسم (Nom)", gender: "مؤنث", number: "مفرد" }
    ]
  },

  // --- 5. التعارف (Introductions & Social) ---
  {
    id: 'intro-1',
    french: "Comment vous appelez-vous ?",
    arabic: "ما هو اسم حضرتك؟",
    category: 'التعارف',
    register: 'رسمي',
    tone: 'تعارف مهذب',
    cultural_note: "استخدم هذه الصيغة عند التعارف مع شخص لأول مرة أو شخص أكبر سناً، أما مع أقرانك الشباب فيمكنك قول (Comment tu t'appelles ?).",
    words: [
      { french: "Comment", arabic: "كيف / ما", pos: "اسم استفهام (Adverbe interrogatif)", gender: "-", number: "-" },
      { french: "vous", arabic: "أنتم / حضرتك", pos: "ضمير مفعول به انعكاسي (Pronom réfléchi)", gender: "-", number: "جمع" },
      { french: "appelez", arabic: "تدعون / تسمون", pos: "فعل (Verbe appeler)", gender: "-", number: "جمع" },
      { french: "vous", arabic: "حضرتكم (الفاعل)", pos: "ضمير فاعل مقلوب (Pronom sujet)", gender: "-", number: "جمع" }
    ]
  },
  {
    id: 'intro-2',
    french: "Je viens du Maroc et j'habite à Lyon.",
    arabic: "أنا من المغرب وأسكن في ليون.",
    category: 'التعارف',
    register: 'ودي',
    tone: 'تعريف بالنفس',
    cultural_note: "مع المدن نستخدم دائماً حرف الجر (à) مثل à Lyon أو à Paris، بينما مع الدول المذكرة نستخدم (au) ومع المؤنثة (en).",
    words: [
      { french: "Je", arabic: "أنا", pos: "ضمير (Pronom)", gender: "-", number: "مفرد" },
      { french: "viens", arabic: "آتي / أنحدر", pos: "فعل (Verbe venir)", gender: "-", number: "مفرد" },
      { french: "du", arabic: "من الـ", pos: "أداة دمج de + le (Article contracté)", gender: "مذكر", number: "مفرد" },
      { french: "Maroc", arabic: "المغرب", pos: "اسم بلد مذكر (Nom propre)", gender: "مذكر", number: "مفرد" },
      { french: "et", arabic: "و", pos: "حرف عطف (Conjonction)", gender: "-", number: "-" },
      { french: "j'habite", arabic: "أسكن / أعيش", pos: "ضمير + فعل habiter", gender: "-", number: "مفرد" },
      { french: "à", arabic: "في", pos: "حرف جر للمدن (Préposition)", gender: "-", number: "-" },
      { french: "Lyon", arabic: "ليون", pos: "اسم مدينة فرنسية (Nom propre)", gender: "-", number: "مفرد" }
    ]
  },
  {
    id: 'intro-3',
    french: "Ravi de vous rencontrer, monsieur.",
    arabic: "سعيد جداً بلقائك يا سيدي.",
    category: 'التعارف',
    register: 'رسمي',
    tone: 'احترام وترحيب',
    cultural_note: "إذا كانت المتحدثة امرأة، تُكتب الكلمة هكذا (Ravie) بإضافة حرف e في النهاية دون تغيير النطق.",
    words: [
      { french: "Ravi", arabic: "سعيد / مبتهج", pos: "صفة (Adjectif)", gender: "مذكر", number: "مفرد" },
      { french: "de", arabic: "بـ / لـ", pos: "حرف جر (Préposition)", gender: "-", number: "-" },
      { french: "vous", arabic: "حضرتكم", pos: "ضمير مفعول (Pronom)", gender: "-", number: "جمع" },
      { french: "rencontrer", arabic: "لقاء / مقابلة", pos: "فعل في المصدر (Infinitif)", gender: "-", number: "-" },
      { french: "monsieur", arabic: "سيدي", pos: "لقب احترام (Titre de civilité)", gender: "مذكر", number: "مفرد" }
    ]
  },
  {
    id: 'intro-4',
    french: "Quels sont vos passe-temps favoris ?",
    arabic: "ما هي هواياتك المفضلة؟",
    category: 'التعارف',
    register: 'مهذب',
    tone: 'حديث اجتماعي ودي',
    cultural_note: "كلمة (passe-temps) اسم مركب يظل بنفس الهيئة في المفرد والجمع، وتدل على الهوايات وقضاء أوقات الفراغ.",
    words: [
      { french: "Quels", arabic: "ما هي / أي", pos: "اسم استفهام للجمع المذكر (Adjectif interrogatif)", gender: "مذكر", number: "جمع" },
      { french: "sont", arabic: "تكون", pos: "فعل être للجمع (Verbe)", gender: "-", number: "جمع" },
      { french: "vos", arabic: "خاصتكم / هواياتكم", pos: "صفة ملكية للجمع (Adjectif possessif)", gender: "-", number: "جمع" },
      { french: "passe-temps", arabic: "الهوايات / تسلية الوقت", pos: "اسم مركب (Nom composé)", gender: "مذكر", number: "جمع" },
      { french: "favoris", arabic: "المفضلة", pos: "صفة جمع مذكر (Adjectif)", gender: "مذكر", number: "جمع" }
    ]
  },
  {
    id: 'intro-5',
    french: "À très bientôt, passe une excellente journée !",
    arabic: "إلى لقاء قريب جداً، ويومك ممتع وسعيد!",
    category: 'التعارف',
    register: 'ودي',
    tone: 'توديع دافئ',
    cultural_note: "عبارة (À très bientôt) واحدة من أجمل عبارات التوديع الفرنسية الودية، وتُقال عندما تتوقع رؤية الشخص قريباً.",
    words: [
      { french: "À", arabic: "إلى", pos: "حرف جر (Préposition)", gender: "-", number: "-" },
      { french: "très", arabic: "جداً", pos: "ظرف (Adverbe)", gender: "-", number: "-" },
      { french: "bientôt", arabic: "قريباً", pos: "ظرف زمان (Adverbe)", gender: "-", number: "-" },
      { french: "passe", arabic: "اقضِ / أمضِ", pos: "فعل أمر (Verbe passer à l'impératif)", gender: "-", number: "مفرد" },
      { french: "une", arabic: "واحدة", pos: "أداة نكرة (Article indéfini)", gender: "مؤنث", number: "مفرد" },
      { french: "excellente", arabic: "ممتازة / رائعة", pos: "صفة مؤنثة (Adjectif)", gender: "مؤنث", number: "مفرد" },
      { french: "journée", arabic: "نهار / يوم", pos: "اسم (Nom)", gender: "مؤنث", number: "مفرد" }
    ]
  }
];

export const CATEGORIES_CONFIG = [
  {
    id: 'الحياة اليومية',
    title: 'الحياة اليومية',
    subtitle: 'الأسرة، المنزل، الأكل، الروتين...',
    icon: 'home',
    colorGradient: 'from-emerald-500 to-teal-600',
    badgeColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    iconBg: 'bg-emerald-500',
    count: 48
  },
  {
    id: 'التسوق',
    title: 'التسوق',
    subtitle: 'الأسعار، المحلات، المنتجات، الدفع...',
    icon: 'shopping-bag',
    colorGradient: 'from-pink-500 to-rose-600',
    badgeColor: 'bg-pink-500/15 text-pink-300 border-pink-500/30',
    iconBg: 'bg-pink-500',
    count: 42
  },
  {
    id: 'السفر',
    title: 'السفر',
    subtitle: 'المطارات، الفنادق، المواصلات، الاتجاهات...',
    icon: 'plane',
    colorGradient: 'from-blue-500 to-indigo-600',
    badgeColor: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    iconBg: 'bg-blue-500',
    count: 36
  },
  {
    id: 'العمل',
    title: 'العمل',
    subtitle: 'المقابلات، المكاتب، الوظائف، المراسلات...',
    icon: 'briefcase',
    colorGradient: 'from-amber-500 to-orange-600',
    badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    iconBg: 'bg-amber-500',
    count: 28
  },
  {
    id: 'التعارف',
    title: 'التعارف',
    subtitle: 'التحية، الأصدقاء، العلاقات، الهوايات...',
    icon: 'users',
    colorGradient: 'from-purple-500 to-violet-600',
    badgeColor: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    iconBg: 'bg-purple-500',
    count: 24
  }
];
