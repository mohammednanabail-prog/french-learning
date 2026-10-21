import React from 'react';
import { BookOpen, Heart, Bot, Sparkles, CheckCircle2, ChevronLeft } from 'lucide-react';
import { TabType } from './BottomNav';

interface HeaderBannerProps {
  onNavigate: (tab: TabType) => void;
  onOpenAddModal: () => void;
}

export const HeaderBanner: React.FC<HeaderBannerProps> = ({ onNavigate, onOpenAddModal }) => {
  return (
    <div className="space-y-5 pb-6">
      {/* Hero Visual Card with Paris Twilight Artwork */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-indigo-900/40 bg-gradient-to-b from-[#0f172a] to-[#080d1a]">
        <div className="relative h-64 sm:h-72 w-full overflow-hidden">
          <img
            src="/src/assets/images/paris_eiffel_twilight_1792589609880.jpg"
            alt="باريس وبرج إيفل في المساء"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-90 transform scale-105"
          />
          {/* Gradient Scrim for readable text overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a] via-[#0b1228]/60 to-transparent" />
          <div className="absolute inset-0 bg-indigo-950/20 backdrop-blur-[1px]" />
          
          {/* Top Title Overlay */}
          <div className="absolute inset-0 p-5 flex flex-col justify-end text-right">
            {/* French Flag Badge */}
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-2">
              <span className="flex items-center gap-0.5 overflow-hidden rounded-sm text-[12px] shadow-sm">
                <span className="w-1.5 h-3 bg-[#002654] inline-block"></span>
                <span className="w-1.5 h-3 bg-white inline-block"></span>
                <span className="w-1.5 h-3 bg-[#ED2939] inline-block"></span>
              </span>
              <span className="text-xs font-semibold text-white tracking-wide">الفرنسية التفاعلية</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white drop-shadow-md tracking-tight leading-tight">
              تعلم الفرنسية
            </h1>
            <p className="text-sm sm:text-base text-indigo-200 font-medium drop-shadow mt-1">
              خطوة بخطوة نحو التحدث بطلاقة مع الذكاء الاصطناعي
            </p>
          </div>
        </div>
      </div>

      {/* Welcome Card */}
      <div className="bg-[#111933] border border-indigo-500/20 rounded-2xl p-4 shadow-lg relative overflow-hidden">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xl shrink-0">
            👋
          </div>
          <div className="flex-1 text-right">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              مرحباً بك في رحلتك
            </h2>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              اكتشف عالماً جديداً من الفرص من خلال تعلم اللغة الفرنسية عبر بطاقات تفاعلية ونطق صوتي دقيق وتحليل فوري لكل كلمة.
            </p>
          </div>
        </div>

        {/* 3 Quick Action Category Cards */}
        <div className="grid grid-cols-3 gap-2.5 mt-4 pt-4 border-t border-indigo-900/40">
          <button
            onClick={() => onNavigate('library')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md hover:brightness-110 active:scale-95 transition-all text-center min-h-[48px]"
          >
            <BookOpen size={20} className="mb-1.5" />
            <span className="text-xs font-bold leading-tight">المكتبة</span>
            <span className="text-[10px] text-blue-200">التعليمية</span>
          </button>

          <button
            onClick={() => onNavigate('custom')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-gradient-to-br from-pink-600 to-rose-700 text-white shadow-md hover:brightness-110 active:scale-95 transition-all text-center min-h-[48px]"
          >
            <Heart size={20} className="mb-1.5" />
            <span className="text-xs font-bold leading-tight">جملي</span>
            <span className="text-[10px] text-pink-200">الخاصة</span>
          </button>

          <button
            onClick={() => onNavigate('settings')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-gradient-to-br from-teal-600 to-emerald-700 text-white shadow-md hover:brightness-110 active:scale-95 transition-all text-center min-h-[48px]"
          >
            <Bot size={20} className="mb-1.5" />
            <span className="text-xs font-bold leading-tight">إعدادات</span>
            <span className="text-[10px] text-teal-200">الذكاء الاصطناعي</span>
          </button>
        </div>
      </div>

      {/* Quote Card */}
      <div className="bg-gradient-to-l from-indigo-950/60 to-purple-950/40 border border-indigo-500/20 rounded-2xl p-4 shadow-md flex items-center justify-between">
        <div className="text-right space-y-1">
          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-indigo-200 tracking-wide">
            « La langue est la clé d’un nouveau monde. »
          </p>
          <p className="text-xs text-slate-300">
            اللغة هي مفتاح عالم جديد.
          </p>
        </div>
        <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-lg shrink-0 mr-3">
          🌱
        </div>
      </div>

      {/* Add Sentence Quick Call to Action */}
      <button
        onClick={onOpenAddModal}
        className="w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white shadow-xl shadow-indigo-900/30 hover:brightness-105 active:scale-[0.99] transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-indigo-100">
            <Sparkles size={20} />
          </div>
          <div className="text-right">
            <div className="font-bold text-sm">أضف جملة وحللها بالذكاء الاصطناعي</div>
            <div className="text-[11px] text-indigo-200">اكتب بالعربية أو الفرنسية وتعرّف على إعراب كل كلمة</div>
          </div>
        </div>
        <ChevronLeft size={20} className="text-indigo-200 group-hover:-translate-x-1 transition-transform" />
      </button>

      {/* Why French Section */}
      <div className="bg-[#0f172f] border border-slate-800 rounded-2xl p-4 space-y-3">
        <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <span>لماذا تتعلم الفرنسية؟</span>
        </h3>
        <ul className="space-y-2.5 text-xs text-slate-300">
          <li className="flex items-start gap-2.5">
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
            <span>تفتح لك أبواب السفر والعمل في فرنسا وكندا وأكثر من 29 دولة حول العالم.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
            <span>تساعدك على التواصل المباشر مع أكثر من 300 مليون متحدث باللغة الفرنسية.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
            <span>تمنحك فرصاً دراسية وثقافية وبحثية استثنائية في أفضل الجامعات العالمية.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
