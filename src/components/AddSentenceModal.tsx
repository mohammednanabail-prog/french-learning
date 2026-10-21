import React, { useState } from 'react';
import {
  Sparkles,
  Plus,
  X,
  Volume2,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Key,
  Eye,
  EyeOff,
  Lightbulb,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { CategoryKey, SentenceItem, SentenceWord } from '../types';
import { analyzeSentenceWithAI } from '../services/geminiService';
import { audioEngine } from '../utils/audio';

interface AddSentenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveSentence: (sentence: SentenceItem) => void;
  apiKey: string;
  onUpdateApiKey: (key: string) => void;
}

export const AddSentenceModal: React.FC<AddSentenceModalProps> = ({
  isOpen,
  onClose,
  onSaveSentence,
  apiKey,
  onUpdateApiKey,
}) => {
  const [mode, setMode] = useState<'ai' | 'manual'>('ai');
  const [inputText, setInputText] = useState('');
  const [inputLang, setInputLang] = useState<'ar' | 'fr'>('ar');
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('الحياة اليومية');
  const [manualFrench, setManualFrench] = useState('');
  const [manualArabic, setManualArabic] = useState('');
  const [manualNote, setManualNote] = useState('');
  
  // Quick API Key toggle
  const [showKeyAccordion, setShowKeyAccordion] = useState(false);
  const [keyInput, setKeyInput] = useState(apiKey);
  const [showKeyText, setShowKeyText] = useState(false);

  // AI Loading & Result state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<SentenceItem | null>(null);

  if (!isOpen) return null;

  const handleSaveKey = () => {
    onUpdateApiKey(keyInput.trim());
    setShowKeyAccordion(false);
  };

  const handleAiEnhance = async () => {
    if (!inputText.trim()) {
      setErrorMsg('الرجاء إدخال نص أو جملة للبدء في التحليل.');
      return;
    }
    setErrorMsg(null);
    setIsLoading(true);

    try {
      const result = await analyzeSentenceWithAI({
        input: inputText.trim(),
        language: inputLang,
        apiKey: apiKey || undefined,
      });

      const newSentence: SentenceItem = {
        id: 'ai-' + Date.now(),
        french: result.french,
        arabic: result.arabic,
        category: result.category || selectedCategory,
        register: result.register || 'مهذب',
        tone: result.tone || 'مهذب',
        cultural_note: result.cultural_note,
        words: result.words,
        isCustom: true,
        isAiGenerated: true,
        createdAt: new Date().toISOString(),
      };

      setAiResult(newSentence);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'تعذر التحليل بالذكاء الاصطناعي.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDirectAdd = () => {
    if (mode === 'ai') {
      if (!inputText.trim()) {
        setErrorMsg('الرجاء إدخال جملة للإضافة المباشرة.');
        return;
      }
      // Simple direct split
      const rawTokens = inputText.match(/[a-zA-ZÀ-ÿ'’]+|[.,!?;]/g) || [inputText];
      const words: SentenceWord[] = rawTokens
        .filter((t) => !/^[.,!?;]$/.test(t))
        .map((tok) => ({
          french: tok,
          arabic: tok,
          pos: 'كلمة',
          gender: '-',
          number: '-',
        }));

      const newSentence: SentenceItem = {
        id: 'custom-' + Date.now(),
        french: inputLang === 'fr' ? inputText.trim() : inputText.trim(),
        arabic: inputLang === 'ar' ? inputText.trim() : inputText.trim(),
        category: selectedCategory,
        register: 'ودي',
        cultural_note: 'تمت إضافتها مباشرة من قبل المستخدم.',
        words: words.length > 0 ? words : [{ french: inputText, arabic: inputText, pos: 'جملة' }],
        isCustom: true,
        isAiGenerated: false,
        createdAt: new Date().toISOString(),
      };

      onSaveSentence(newSentence);
      resetAndClose();
    } else {
      // Manual mode
      if (!manualFrench.trim() || !manualArabic.trim()) {
        setErrorMsg('الرجاء إدخال الجملة بالفرنسية وترجمتها بالعربية.');
        return;
      }
      const rawTokens = manualFrench.match(/[a-zA-ZÀ-ÿ'’]+|[.,!?;]/g) || [manualFrench];
      const words: SentenceWord[] = rawTokens
        .filter((t) => !/^[.,!?;]$/.test(t))
        .map((tok) => ({
          french: tok,
          arabic: tok,
          pos: 'كلمة',
          gender: '-',
          number: '-',
        }));

      const newSentence: SentenceItem = {
        id: 'custom-' + Date.now(),
        french: manualFrench.trim(),
        arabic: manualArabic.trim(),
        category: selectedCategory,
        register: 'مهذب',
        cultural_note: manualNote.trim() || 'جملة مضافة يدوياً في مجموعتك.',
        words,
        isCustom: true,
        isAiGenerated: false,
        createdAt: new Date().toISOString(),
      };

      onSaveSentence(newSentence);
      resetAndClose();
    }
  };

  const handleSaveAiResult = () => {
    if (!aiResult) return;
    onSaveSentence(aiResult);
    resetAndClose();
  };

  const resetAndClose = () => {
    setInputText('');
    setManualFrench('');
    setManualArabic('');
    setManualNote('');
    setAiResult(null);
    setErrorMsg(null);
    onClose();
  };

  const samplePrompts = [
    'أريد جملة عن طلب القهوة في المقهى',
    'كيف أسأل عن اتجاه محطة المترو؟',
    'كم سعر هذا الفستان الجميل؟',
    'أنا سعيد جداً بلقائكم اليوم للعمل',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
      <div className="bg-[#0e1630] border border-indigo-900/60 rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-slideUp">
        {/* Modal Top Bar */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <button
            onClick={resetAndClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>

          <h3 className="text-base font-black text-white flex items-center gap-2">
            <span>{aiResult ? 'النتيجة من الذكاء الاصطناعي' : 'إضافة جملة جديدة'}</span>
            {!aiResult && <Sparkles size={16} className="text-purple-400" />}
          </h3>

          <div className="w-8" />
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1 text-right">
          {/* If Result is Ready (Screen 5) */}
          {aiResult ? (
            <div className="space-y-4 animate-fadeIn">
              {/* Success Badge */}
              <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl flex items-center gap-2.5 text-emerald-300 text-xs font-bold">
                <CheckCircle2 size={18} className="shrink-0 text-emerald-400" />
                <span>تم إنشاء الجملة وتفصيلها بنجاح بالذكاء الاصطناعي!</span>
              </div>

              {/* French Sentence Card */}
              <div className="bg-[#121a38] border border-indigo-500/30 rounded-2xl p-4 shadow-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-indigo-950 text-indigo-300 border border-indigo-500/30">
                    {aiResult.category}
                  </span>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300">
                      {aiResult.register}
                    </span>
                    <button
                      onClick={() => audioEngine.speak(aiResult.french)}
                      className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md active:scale-95 transition-all"
                      title="استمع"
                    >
                      <Volume2 size={16} />
                    </button>
                  </div>
                </div>

                <div
                  dir="ltr"
                  className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-bold text-white text-left leading-relaxed"
                >
                  {aiResult.french}
                </div>

                <div className="text-sm font-bold text-slate-200 border-t border-slate-800/80 pt-2">
                  {aiResult.arabic}
                </div>
              </div>

              {/* Cultural Note */}
              {aiResult.cultural_note && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-xs text-amber-200/90 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-amber-400">
                    <Lightbulb size={15} />
                    <span>ملاحظة ثقافية ولغوية:</span>
                  </div>
                  <p className="leading-relaxed">{aiResult.cultural_note}</p>
                </div>
              )}

              {/* Word breakdown list */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-400">تفصيل الكلمات:</div>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {aiResult.words.map((w, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-[#101733] border border-slate-800 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => audioEngine.speak(w.french)}
                          className="p-1 rounded bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 text-[10px]"
                        >
                          🔊
                        </button>
                        <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-indigo-300">
                          {w.french}
                        </span>
                        <span className="text-slate-400 text-[10px]">({w.pos})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-200 font-semibold">{w.arabic}</span>
                        {w.gender && w.gender !== '-' && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-blue-300">
                            {w.gender}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleSaveAiResult}
                  className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-900/40 transition-all active:scale-95"
                >
                  حفظ في مكتبتي
                </button>
                <button
                  onClick={() => setAiResult(null)}
                  className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all"
                >
                  تعديل المدخلات
                </button>
              </div>
            </div>
          ) : (
            // Input Form (Screen 4)
            <div className="space-y-4">
              {/* Segmented Mode Toggle */}
              <div className="flex items-center gap-1 p-1 bg-[#101730] border border-slate-800 rounded-xl">
                <button
                  onClick={() => setMode('ai')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 min-h-[40px] ${
                    mode === 'ai'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sparkles size={14} />
                  <span>بمساعدة الذكاء الاصطناعي</span>
                </button>
                <button
                  onClick={() => setMode('manual')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all min-h-[40px] flex items-center justify-center ${
                    mode === 'manual'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>إدخال يدوي</span>
                </button>
              </div>

              {/* Gemini API Key Quick Box */}
              <div className="bg-[#101733] border border-slate-800 rounded-2xl overflow-hidden text-xs">
                <button
                  onClick={() => setShowKeyAccordion(!showKeyAccordion)}
                  className="w-full p-3 flex items-center justify-between text-slate-300 font-semibold hover:bg-slate-800/40 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Key size={14} className="text-amber-400" />
                    <span>مفتاح Gemini API</span>
                    {apiKey ? (
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        مفعل ومحفوظ
                      </span>
                    ) : (
                      <span className="text-[10px] text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded-full">
                        جاهز عبر الخادم
                      </span>
                    )}
                  </div>
                  {showKeyAccordion ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {showKeyAccordion && (
                  <div className="p-3 pt-0 border-t border-slate-800/60 space-y-2">
                    <div className="relative">
                      <input
                        type={showKeyText ? 'text' : 'password'}
                        value={keyInput}
                        onChange={(e) => setKeyInput(e.target.value)}
                        placeholder="أدخل مفتاح Gemini API المخصص..."
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0b1022] border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 text-xs"
                      />
                      <button
                        onClick={() => setShowKeyText(!showKeyText)}
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                      >
                        {showKeyText ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] text-slate-400">
                        يتم حفظ المفتاح بأمان في متصفحك (localStorage).
                      </p>
                      <button
                        onClick={handleSaveKey}
                        className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
                      >
                        حفظ
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Category Picker */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">الفئة:</label>
                <div className="flex flex-wrap gap-1.5">
                  {(['الحياة اليومية', 'التسوق', 'السفر', 'العمل', 'التعارف'] as CategoryKey[]).map(
                    (cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all min-h-[38px] ${
                          selectedCategory === cat
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-[#101733] border border-slate-800 text-slate-300 hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Error message */}
              {errorMsg && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-300 font-medium">
                  ⚠️ {errorMsg}
                </div>
              )}

              {/* AI Mode Input */}
              {mode === 'ai' ? (
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-300">أدخل فكرتك أو جملتك:</label>
                      <div className="flex items-center gap-1 bg-[#101730] p-0.5 rounded-lg border border-slate-800 text-[11px]">
                        <button
                          onClick={() => setInputLang('ar')}
                          className={`px-2 py-0.5 rounded-md font-bold transition-colors ${
                            inputLang === 'ar' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                          }`}
                        >
                          عربي
                        </button>
                        <button
                          onClick={() => setInputLang('fr')}
                          className={`px-2 py-0.5 rounded-md font-bold transition-colors ${
                            inputLang === 'fr' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                          }`}
                        >
                          فرنسي
                        </button>
                      </div>
                    </div>

                    <textarea
                      rows={3}
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder={
                        inputLang === 'ar'
                          ? 'اكتب بالعربية (فصحى أو لهجة) مثلاً: أريد فنجان قهوة من فضلك...'
                          : 'Écrivez en français, ex: Je cherche la gare la plus proche...'
                      }
                      className="w-full p-3 rounded-2xl bg-[#111933] border border-slate-800 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 text-xs sm:text-sm font-medium leading-relaxed"
                    />
                  </div>

                  {/* Sample prompt chips */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] text-slate-400 font-semibold">أفكار مقترحة سريعة:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {samplePrompts.map((p, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setInputText(p);
                            setInputLang('ar');
                          }}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-[#101730] hover:bg-[#182348] border border-slate-800 text-slate-300 transition-colors"
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Primary Buttons */}
                  <div className="space-y-2 pt-2">
                    <button
                      onClick={handleAiEnhance}
                      disabled={isLoading}
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-900/30 active:scale-95 transition-all disabled:opacity-50 min-h-[48px]"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>جاري التحليل بالذكاء الاصطناعي...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={18} />
                          <span>تحسين وتفصيل بالذكاء الاصطناعي</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleDirectAdd}
                      disabled={isLoading}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-indigo-700 to-purple-800 hover:brightness-110 text-white font-bold text-xs transition-all active:scale-95 min-h-[44px]"
                    >
                      <Plus size={16} />
                      <span>إضافة مباشرة بدون انتظار</span>
                    </button>
                  </div>
                </div>
              ) : (
                // Manual Mode Input
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">الجملة بالفرنسية:</label>
                    <input
                      type="text"
                      dir="ltr"
                      value={manualFrench}
                      onChange={(e) => setManualFrench(e.target.value)}
                      placeholder="Ex: Merci beaucoup pour votre aide !"
                      className="w-full p-3 rounded-xl bg-[#111933] border border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 text-xs sm:text-sm font-['Plus_Jakarta_Sans',sans-serif]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">الترجمة بالعربية:</label>
                    <input
                      type="text"
                      value={manualArabic}
                      onChange={(e) => setManualArabic(e.target.value)}
                      placeholder="مثال: شكراً جزيلاً على مساعدتكم!"
                      className="w-full p-3 rounded-xl bg-[#111933] border border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 text-xs sm:text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">ملاحظة ثقافية أو نحوية (اختياري):</label>
                    <textarea
                      rows={2}
                      value={manualNote}
                      onChange={(e) => setManualNote(e.target.value)}
                      placeholder="مثال: تستخدم في المواقف الرسمية والودية..."
                      className="w-full p-3 rounded-xl bg-[#111933] border border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 text-xs"
                    />
                  </div>

                  <button
                    onClick={handleDirectAdd}
                    className="w-full py-3.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-900/30 active:scale-95 transition-all min-h-[48px]"
                  >
                    حفظ الجملة في مكتبتي
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
