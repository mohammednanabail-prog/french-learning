import React, { useState, useMemo } from 'react';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Volume2,
  Home,
  ShoppingBag,
  Plane,
  Briefcase,
  Users,
  Sparkles,
  Heart,
} from 'lucide-react';
import { CategoryKey, SentenceItem } from '../types';
import { CATEGORIES_CONFIG } from '../data/initialSentences';
import { audioEngine } from '../utils/audio';

interface CategoryLibraryViewProps {
  sentences: SentenceItem[];
  onSelectSentence: (sentence: SentenceItem) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onBackToHome: () => void;
}

export const CategoryLibraryView: React.FC<CategoryLibraryViewProps> = ({
  sentences,
  onSelectSentence,
  favorites,
  onToggleFavorite,
  onBackToHome,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Icon mapping
  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'home':
        return <Home size={22} className="text-white" />;
      case 'shopping-bag':
        return <ShoppingBag size={22} className="text-white" />;
      case 'plane':
        return <Plane size={22} className="text-white" />;
      case 'briefcase':
        return <Briefcase size={22} className="text-white" />;
      case 'users':
        return <Users size={22} className="text-white" />;
      default:
        return <Home size={22} className="text-white" />;
    }
  };

  // Filter sentences by category & search query
  const filteredSentences = useMemo(() => {
    return sentences.filter((s) => {
      // Category filter
      if (selectedCategory && s.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesFrench = s.french.toLowerCase().includes(q);
        const matchesArabic = s.arabic.toLowerCase().includes(q);
        const matchesWords = s.words.some(
          (w) => w.french.toLowerCase().includes(q) || w.arabic.toLowerCase().includes(q)
        );
        return matchesFrench || matchesArabic || matchesWords;
      }
      return true;
    });
  }, [sentences, selectedCategory, searchQuery]);

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
      {/* Header */}
      <div className="flex items-center justify-between py-1">
        <button
          onClick={selectedCategory ? () => setSelectedCategory(null) : onBackToHome}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition-all text-xs font-semibold min-h-[44px]"
        >
          <ChevronRight size={18} />
          <span>{selectedCategory ? 'جميع الفئات' : 'الرئيسية'}</span>
        </button>

        <div className="text-center">
          <h2 className="text-lg font-black text-white">
            {selectedCategory ? selectedCategory : 'المكتبة التعليمية'}
          </h2>
          <p className="text-[11px] text-slate-400">
            {selectedCategory
              ? `${filteredSentences.length} جملة متوفرة`
              : 'اختر فئة لتصفح الجمل والعبارات المفيدة'}
          </p>
        </div>

        <div className="w-12" />
      </div>

      {/* Live Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="🔍 إبحث عن جملة أو كلمة (بالفرنسية أو بالعربية)..."
          className="w-full pl-4 pr-11 py-3 rounded-2xl bg-[#111933] border border-slate-800 focus:border-indigo-500 focus:outline-none text-slate-100 placeholder:text-slate-500 text-xs sm:text-sm font-medium shadow-md transition-all"
        />
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <Search size={18} />
        </div>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2 py-1 rounded-lg bg-slate-800"
          >
            مسح
          </button>
        )}
      </div>

      {/* Categories Grid / Selection (shown when no specific category is selected and no search) */}
      {!selectedCategory && !searchQuery && (
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-400 px-1">الفئات التعليمية</div>
          <div className="space-y-2.5">
            {CATEGORIES_CONFIG.map((cat) => {
              const countInStore = sentences.filter((s) => s.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as CategoryKey)}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#101833] hover:bg-[#162144] border border-slate-800/80 hover:border-indigo-500/40 shadow-lg transition-all group active:scale-[0.99] min-h-[58px]"
                >
                  <div className="flex items-center gap-3.5">
                    {/* Icon Square */}
                    <div
                      className={`w-12 h-12 rounded-2xl ${cat.iconBg} flex items-center justify-center shadow-md shadow-black/20 shrink-0 group-hover:scale-105 transition-transform`}
                    >
                      {renderCategoryIcon(cat.icon)}
                    </div>
                    {/* Titles */}
                    <div className="text-right">
                      <div className="text-sm font-bold text-white group-hover:text-indigo-200 transition-colors">
                        {cat.title}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                        {cat.subtitle}
                      </div>
                      <div className="text-[10px] text-indigo-400 font-semibold mt-0.5">
                        {countInStore || cat.count} جملة
                      </div>
                    </div>
                  </div>

                  {/* Left Chevron in RTL */}
                  <ChevronLeft
                    size={20}
                    className="text-slate-500 group-hover:text-white group-hover:-translate-x-1 transition-all"
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Active Category Filter Header if Selected */}
      {selectedCategory && (
        <div className="flex items-center justify-between p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-xs">
          <div className="flex items-center gap-2 text-indigo-300 font-bold">
            <span>تصفية حسب:</span>
            <span className="px-2 py-0.5 rounded bg-indigo-600 text-white font-medium">
              {selectedCategory}
            </span>
          </div>
          <button
            onClick={() => setSelectedCategory(null)}
            className="text-xs text-indigo-400 hover:text-indigo-200 underline font-semibold"
          >
            إلغاء التصفية
          </button>
        </div>
      )}

      {/* Sentence Cards List */}
      {(selectedCategory || searchQuery) && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>النتائج ({filteredSentences.length} جملة)</span>
            <span className="text-[11px]">اضغط على الجملة لتفصيل الكلمات</span>
          </div>

          {filteredSentences.length === 0 ? (
            <div className="p-8 text-center bg-[#0d1428] border border-slate-800 rounded-2xl space-y-2">
              <div className="text-3xl">🔍</div>
              <div className="text-sm font-bold text-slate-300">لم يتم العثور على جمل مطابقة</div>
              <p className="text-xs text-slate-500">
                جرب البحث بكلمات أخرى أو أضف جملتك الخاصة عبر زر الإضافة!
              </p>
            </div>
          ) : (
            filteredSentences.map((sentence) => {
              const isFav = favorites.includes(sentence.id);
              const isPlaying = playingId === sentence.id;
              return (
                <div
                  key={sentence.id}
                  onClick={() => onSelectSentence(sentence)}
                  className="p-4 rounded-2xl bg-[#111933] hover:bg-[#162145] border border-slate-800/80 hover:border-indigo-500/50 shadow-md transition-all cursor-pointer group space-y-3"
                >
                  {/* Top Row: Category & Tone Badges */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                        {sentence.category}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300">
                        {sentence.register}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(sentence.id);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 transition-colors"
                      >
                        <Heart
                          size={16}
                          className={isFav ? 'fill-rose-500 stroke-rose-500' : ''}
                        />
                      </button>
                    </div>
                  </div>

                  {/* French Sentence with Audio button */}
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

                  {/* Cultural note teaser */}
                  {sentence.cultural_note && (
                    <div className="text-[11px] text-amber-200/80 bg-amber-500/10 px-2.5 py-1.5 rounded-xl border border-amber-500/15 line-clamp-1">
                      💡 {sentence.cultural_note}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
