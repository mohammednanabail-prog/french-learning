import React, { useState, useEffect } from 'react';
import {
  Key,
  Volume2,
  Download,
  Upload,
  RefreshCw,
  CheckCircle2,
  Eye,
  EyeOff,
  Sparkles,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { audioEngine } from '../utils/audio';
import { generateStandaloneHTML } from '../utils/exporter';
import { SentenceItem } from '../types';

interface SettingsViewProps {
  apiKey: string;
  onSaveApiKey: (key: string) => void;
  customSentences: SentenceItem[];
  onImportSentences: (imported: SentenceItem[]) => void;
  onResetAllData: () => void;
  onBackToHome: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  apiKey,
  onSaveApiKey,
  customSentences,
  onImportSentences,
  onResetAllData,
  onBackToHome,
}) => {
  const [keyInput, setKeyInput] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  // Audio voice test
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');

  useEffect(() => {
    const list = audioEngine.getAvailableVoices();
    setVoices(list);
    if (list.length > 0) {
      setSelectedVoice(list[0].voiceURI);
    }
  }, []);

  const handleSave = () => {
    onSaveApiKey(keyInput.trim());
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleTestKey = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await fetch('/api/gemini/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: 'Bonjour le monde',
          language: 'fr',
          apiKey: keyInput.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setTestResult('✅ الاتصال بنموذج Gemini ناجح ومستقر!');
      } else {
        setTestResult(`❌ خطأ: ${data.error || 'تعذر الاتصال'}`);
      }
    } catch (e: any) {
      setTestResult(`⚠️ تعذر إجراء فحص الاتصال: ${e.message}`);
    } finally {
      setIsTesting(false);
    }
  };

  const handleDownloadStandalone = () => {
    const html = generateStandaloneHTML(customSentences);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'french-learning-standalone.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(customSentences, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'french-learning-custom-sentences.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          onImportSentences(parsed);
          alert(`تم استيراد ${parsed.length} جملة بنجاح!`);
        }
      } catch (err) {
        alert('الملف غير صالح، يرجى اختيار ملف JSON مطابق.');
      }
    };
    reader.readAsText(file);
  };

  const handleTestVoiceAudio = () => {
    audioEngine.speak('Bonjour, bienvenue dans votre application de français !', {
      rate: 0.95,
    });
  };

  return (
    <div className="space-y-4 pb-12 animate-fadeIn text-right">
      {/* Header */}
      <div className="flex items-center justify-between py-1">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition-all text-xs font-semibold min-h-[44px]"
        >
          <ChevronRight size={18} />
          <span>الرئيسية</span>
        </button>

        <div className="text-center">
          <h2 className="text-lg font-black text-white flex items-center justify-center gap-1.5">
            <Key size={18} className="text-indigo-400" />
            <span>إعدادات الذكاء الاصطناعي</span>
          </h2>
          <p className="text-[11px] text-slate-400">تخصيص المفتاح والصوت والتخزين</p>
        </div>

        <div className="w-12" />
      </div>

      {/* Gemini API Key Box */}
      <div className="bg-[#111933] border border-indigo-500/30 rounded-2xl p-4 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">مفتاح Google Gemini API</h3>
              <p className="text-[11px] text-slate-400">
                يُحفظ بأمان في متصفحك (localStorage)
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#0b1022] border border-slate-700 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 text-xs font-mono"
            />
            <button
              onClick={() => setShowKey(!showKey)}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="flex-1 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md active:scale-95 transition-all min-h-[40px]"
            >
              حفظ المفتاح
            </button>
            <button
              onClick={handleTestKey}
              disabled={isTesting}
              className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 min-h-[40px]"
            >
              {isTesting ? 'جاري الفحص...' : 'فحص الاتصال'}
            </button>
          </div>

          {saveSuccess && (
            <div className="p-2.5 bg-emerald-500/15 border border-emerald-500/30 rounded-xl flex items-center gap-2 text-emerald-300 text-xs font-semibold">
              <CheckCircle2 size={16} />
              <span>تم حفظ مفتاح API في متصفحك بنجاح!</span>
            </div>
          )}

          {testResult && (
            <div className="p-2.5 bg-indigo-950/60 border border-indigo-500/30 rounded-xl text-xs text-indigo-200 font-medium leading-relaxed">
              {testResult}
            </div>
          )}
        </div>
      </div>

      {/* Speech Pronunciation Engine Box */}
      <div className="bg-[#111933] border border-slate-800 rounded-2xl p-4 shadow-lg space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Volume2 size={16} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">إعدادات النطق الفرنسي</h3>
            <p className="text-[11px] text-slate-400">
              Web Speech API متوافقة مع جميع الأجهزة
            </p>
          </div>
        </div>

        {voices.length > 0 && (
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">الصوت الفرنسي المتاح:</label>
            <select
              value={selectedVoice}
              onChange={(e) => {
                setSelectedVoice(e.target.value);
                audioEngine.setVoiceByURI(e.target.value);
              }}
              className="w-full p-2.5 rounded-xl bg-[#0b1022] border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
            >
              {voices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          onClick={handleTestVoiceAudio}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 hover:text-white border border-slate-700/80 font-bold text-xs transition-colors min-h-[40px]"
        >
          <Volume2 size={16} />
          <span>اختبر النطق الفرنسي الآن</span>
        </button>
      </div>

      {/* Deliverable: Standalone Single-File HTML Export */}
      <div className="bg-gradient-to-r from-purple-950/40 to-indigo-950/40 border border-purple-500/30 rounded-2xl p-4 shadow-lg space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center">
            <Download size={16} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">تحميل كملف HTML مستقل كامل</h3>
            <p className="text-[11px] text-purple-200/80">
              ملف واحد يحتوي على HTML و Tailwind CDN وجافاسكريبت مدمج جاهز للتشغيل مباشرة!
            </p>
          </div>
        </div>

        <button
          onClick={handleDownloadStandalone}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs shadow-md transition-all active:scale-95 min-h-[44px]"
        >
          <Download size={16} />
          <span>تحميل ملف french-learning-standalone.html</span>
        </button>
      </div>

      {/* Data Backup & Restore */}
      <div className="bg-[#111933] border border-slate-800 rounded-2xl p-4 shadow-lg space-y-3">
        <h3 className="text-sm font-bold text-white">إدارة البيانات والمزامنة</h3>
        <p className="text-[11px] text-slate-400">
          لديك {customSentences.length} جملة مخصصة محفوظة في المتصفح.
        </p>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleExportJSON}
            className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors min-h-[40px]"
          >
            <Download size={14} />
            <span>تصدير JSON</span>
          </button>

          <label className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer transition-colors min-h-[40px]">
            <Upload size={14} />
            <span>استيراد JSON</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />
          </label>
        </div>

        <button
          onClick={() => {
            if (confirm('هل ترغب في إعادة تعيين كافة البيانات واستعادة الإعدادات الأصلية؟')) {
              onResetAllData();
            }
          }}
          className="w-full flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-red-950/30 hover:bg-red-900/40 text-red-400 border border-red-500/20 text-xs font-semibold transition-colors min-h-[40px]"
        >
          <RefreshCw size={14} />
          <span>استعادة الإعدادات الأصلية</span>
        </button>
      </div>
    </div>
  );
};
