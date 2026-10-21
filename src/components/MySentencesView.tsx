import React, { useState, useMemo } from 'react';
import {
  Plus,
  Heart,
  Volume2,
  Trash2,
  Sparkles,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { SentenceItem } from '../types';
import { audioEngine } from '../utils/audio';

interface MySentencesViewProps {
  customSentences: SentenceItem[];
  allSentences: SentenceItem[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onDeleteCustomSentence: (id: string) => void;
  onSelectSentence: (sentence: SentenceItem) => void;
  onOpenAddModal: () => void;
  onBackToHome: () => void;
}

type FilterTab = 'all' | 'custom' | 'ai' | 'favorites';

export const MySentencesView: React.FC<MySentencesViewProps> = ({
  customSentences,
  allSentences,
  favorites,
  onToggleFavorite,
  onDeleteCustomSentence,
  onSelectSentence,
  onOpenAddModal,
  onBackToHome,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Filter list
  const displayedSentences = useMemo(() => {
    // Collect all relevant sentences
    if (activeFilter === 'favorites') {
      return allSentences.filter((s) => favorites.includes(s.id));
    }
    if (activeFilter === 'ai') {
      return customSentences.filter((s) => s.isAiGenerated);
    }
    if (activeFilter === 'custom') {
      return customSentences.filter((s) => s.isCustom && !s.isAiGenerated);
    }
    // 'all' saved & custom sentences (or if empty, show all favorites)
    return customSentences.length > 0
      ? customSentences
      : allSentences.filter((s) => favorites.includes(s.id));
  }, [activeFilter, customSentences, allSentences, favorites]);

  const handlePlayAudio = (e: React.MouseEvent, sentence: SentenceItem) => {
    e.stopPropagation();
    if (playingId === sentence.id) {
      audioEngine.stop();
      setPlayingId(null);
      return;
    }
    setPlayingId(sentence.id);
    audioEngine.speak(sentence.french, {
      onEnd: () => setPlayingId(null),
      onError: () => setPlayingId(null),
    });
  };

  return (
    <div className="space-y-4 pb-12 animate-fadeIn">
      {/* Top Header */}
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
            <Heart size={18} className="text-pink-500 fill-pink-500" />
            <span>جملي الخاصة</span>
          </h2>
          <p className="text-[11px] text-slate-400">جملك المخصصة محفوظة ومتاحة دائماً</p>
        </div>

        <div className="w-12" />
      </div>

      {/* Primary Add New Sentence Action Button */}
      <button
        onClick={onOpenAddModal}
        className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-indigo-900/30 active:scale-[0.98] transition-all min-h-[48px]"
      >
        <Plus size={18} />
        <span>إضافة جملة جديدة</span>
      </button>

      {/* Segmented Filter Controls */}
      <div className="flex items-center gap-1 p-1 bg-[#101730] border border-slate-800 rounded-xl overflow-x-auto">
        <button
          onClick={() => setActiveFilter('all')}
          className={`flex-1 min-w-[70px] py-2 px-3 rounded-lg text-xs font-bold transition-all text-center whitespace-nowrap min-h-[40px] flex items-center justify-center ${
            activeFilter === 'all'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          الكل ({customSentences.length})
        </button>

        <button
          onClick={() => setActiveFilter('custom')}
          className={`flex-1 min-w-[70px] py-2 px-3 rounded-lg text-xs font-bold transition-all text-center whitespace-nowrap min-h-[40px] flex items-center justify-center ${
            activeFilter === 'custom'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          جملي المضافة
        </button>

        <button
          onClick={() => setActiveFilter('ai')}
          className={`flex-1 min-w-[70px] py-2 px-3 rounded-lg text-xs font-bold transition-all text-center whitespace-nowrap min-h-[40px] flex items-center justify-center ${
            activeFilter === 'ai'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles size={12} className="ml-1 text-purple-300" />
          <span>الذكاء الاصطناعي</span>
        </button>

        <button
          onClick={() => setActiveFilter('favorites')}
          className={`flex-1 min-w-[70px] py-2 px-3 rounded-lg text-xs font-bold transition-all text-center whitespace-nowrap min-h-[40px] flex items-center justify-center ${
            activeFilter === 'favorites'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Heart size={12} className="ml-1 text-pink-300" />
          <span>المفضلة ({favorites.length})</span>
        </button>
      </div>

      {/* Sentence Cards List */}
      <div className="space-y-3">
        {displayedSentences.length === 0 ? (
          <div className="p-8 text-center bg-[#0d1428] border border-slate-800 rounded-3xl space-y-3">
            <div className="w-14 h-14 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto text-2xl">
              ✍️
            </div>
            <h3 className="text-base font-bold text-slate-200">
              {activeFilter === 'favorites'
                ? 'لا توجد جمل في المفضلة بعد'
                : 'لم تقم بإضافة جمل خاصة بعد'}
            </h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
              {activeFilter === 'favorites'
                ? 'اضغط على أيقونة القلب في أي بطاقة لحفظها هنا والوصول إليها بسرعة!'
                : 'اكتب أي فكرة أو عبارة وسيقوم الذكاء الاصطناعي بصياغتها وإعراب كل كلمة فيها.'}
            </p>
            <button
              onClick={onOpenAddModal}
              className="mt-2 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition-all min-h-[44px]"
            >
              <Plus size={16} />
              <span>أضف أول جملة لك الآن</span>
            </button>
          </div>
        ) : (
          displayedSentences.map((sentence) => {
            const isFav = favorites.includes(sentence.id);
            const isPlaying = playingId === sentence.id;
            return (
              <div
                key={sentence.id}
                onClick={() => onSelectSentence(sentence)}
                className="p-4 rounded-2xl bg-[#111933] hover:bg-[#162145] border border-slate-800/80 hover:border-indigo-500/50 shadow-md transition-all cursor-pointer group space-y-3"
              >
                {/* Meta Header */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {sentence.category}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300">
                      {sentence.register}
                    </span>
                    {sentence.isAiGenerated && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                        <Sparkles size={10} />
                        <span>AI</span>
                      </span>
                    )}
                  </div>

                  {/* Actions: Favorite & Delete (if custom) */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(sentence.id);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 transition-colors"
                      title={isFav ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
                    >
                      <Heart
                        size={16}
                        className={isFav ? 'fill-rose-500 stroke-rose-500' : ''}
                      />
                    </button>

                    {sentence.isCustom && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm('هل أنت متأكد من حذف هذه الجملة من مجموعتك؟')) {
                            onDeleteCustomSentence(sentence.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                        title="حذف الجملة"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {/* French Sentence & Audio Button */}
                <div className="flex items-start justify-between gap-3">
                  <div
                    dir="ltr"
                    className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-white group-hover:text-indigo-200 transition-colors leading-relaxed"
                  >
                    {sentence.french}
                  </div>

                  <button
                    onClick={(e) => handlePlayAudio(e, sentence)}
                    className={`p-2.5 rounded-xl min-w-[40px] min-h-[40px] flex items-center justify-center transition-all shrink-0 ${
                      isPlaying
                        ? 'bg-emerald-600 text-white shadow-emerald-600/30 ring-2 ring-emerald-400'
                        : 'bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white'
                    }`}
                    title="استمع إلى الجملة"
                  >
                    <Volume2 size={16} className={isPlaying ? 'animate-bounce' : ''} />
                  </button>
                </div>

                {/* Arabic Translation */}
                <div className="text-xs sm:text-sm font-semibold text-slate-300 text-right">
                  {sentence.arabic}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
