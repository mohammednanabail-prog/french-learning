import React, { useState, useEffect } from 'react';
import {
  Volume2,
  Heart,
  ChevronRight,
  Lightbulb,
  Sparkles,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { SentenceItem, SentenceWord } from '../types';
import { audioEngine } from '../utils/audio';

interface SentenceDetailViewProps {
  sentence: SentenceItem;
  onBack: () => void;
  isFavorited: boolean;
  onToggleFavorite: (id: string) => void;
}

export const SentenceDetailView: React.FC<SentenceDetailViewProps> = ({
  sentence,
  onBack,
  isFavorited,
  onToggleFavorite,
}) => {
  const [selectedWordIndex, setSelectedWordIndex] = useState<number | null>(null);
  const [isPlayingFull, setIsPlayingFull] = useState(false);
  const [playingWordIndex, setPlayingWordIndex] = useState<number | null>(null);
  const [isSlowSpeed, setIsSlowSpeed] = useState(false);
  const [showWordsBreakdown, setShowWordsBreakdown] = useState(true);

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      audioEngine.stop();
    };
  }, []);

  const handlePlayFullSentence = () => {
    if (isPlayingFull) {
      audioEngine.stop();
      setIsPlayingFull(false);
      return;
    }

    setIsPlayingFull(true);
    audioEngine.speak(sentence.french, {
      rate: isSlowSpeed ? 0.65 : 0.95,
      onStart: () => setIsPlayingFull(true),
      onEnd: () => setIsPlayingFull(false),
      onError: () => setIsPlayingFull(false),
    });
  };

  const handlePlayWord = (word: SentenceWord, index: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setPlayingWordIndex(index);
    audioEngine.speak(word.french, {
      rate: isSlowSpeed ? 0.6 : 0.85,
      onStart: () => setPlayingWordIndex(index),
      onEnd: () => setPlayingWordIndex(null),
      onError: () => setPlayingWordIndex(null),
    });
  };

  const handleWordClick = (word: SentenceWord, index: number) => {
    if (selectedWordIndex === index) {
      setSelectedWordIndex(null);
    } else {
      setSelectedWordIndex(index);
      handlePlayWord(word, index);
    }
  };

  const selectedWord =
    selectedWordIndex !== null ? sentence.words[selectedWordIndex] : null;

  return (
    <div className="space-y-4 pb-12 animate-fadeIn">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between py-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition-all text-xs font-semibold min-h-[44px]"
        >
          <ChevronRight size={18} />
          <span>رجوع</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
            <span>🏷️</span>
            <span>{sentence.category}</span>
          </span>

          <button
            onClick={() => onToggleFavorite(sentence.id)}
            className={`p-2.5 rounded-xl border transition-all min-h-[44px] min-w-[44px] flex items-center justify-center ${
              isFavorited
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                : 'bg-slate-800/80 border-slate-700/60 text-slate-400 hover:text-white'
            }`}
            title={isFavorited ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
          >
            <Heart
              size={18}
              className={isFavorited ? 'fill-rose-500 stroke-rose-500' : ''}
            />
          </button>
        </div>
      </div>

      {/* Main Interactive Sentence Card */}
      <div className="bg-gradient-to-b from-[#111936] to-[#0c1328] border border-indigo-500/30 rounded-3xl p-5 shadow-2xl relative overflow-hidden space-y-4">
        {/* Subtle Decorative Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Register Tag */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-indigo-950 border border-indigo-500/30 text-indigo-300 font-medium">
              {sentence.register}
            </span>
            {sentence.tone && (
              <span className="text-[11px] text-slate-400">
                النبرة: {sentence.tone}
              </span>
            )}
          </div>
          {sentence.isAiGenerated && (
            <span className="flex items-center gap-1 text-[11px] text-purple-300">
              <Sparkles size={12} />
              <span>ذكاء اصطناعي</span>
            </span>
          )}
        </div>

        {/* Interactive French Sentence Words */}
        <div className="bg-[#0b1024]/90 border border-indigo-500/20 rounded-2xl p-4 shadow-inner">
          <div className="text-xs text-indigo-300/80 mb-2 font-medium flex items-center justify-between">
            <span>اضغط على أي كلمة لمعرفة إعرابها وترجمتها ونطقها:</span>
            <button
              onClick={handlePlayFullSentence}
              className="p-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 transition-colors"
              title="نطق الجملة"
            >
              <Volume2 size={16} />
            </button>
          </div>

          <div
            dir="ltr"
            className="flex flex-wrap gap-2 items-center font-['Plus_Jakarta_Sans',sans-serif] text-xl sm:text-2xl font-bold tracking-wide leading-relaxed py-2"
          >
            {sentence.words.map((word, idx) => {
              const isSelected = selectedWordIndex === idx;
              const isSpeaking = playingWordIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleWordClick(word, idx)}
                  className={`px-3 py-1.5 rounded-xl border text-left transition-all duration-200 select-none cursor-pointer min-h-[44px] flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-600/30 scale-105 ring-2 ring-indigo-400/50'
                      : 'bg-[#162044] hover:bg-[#1e2b5c] text-slate-100 border-indigo-900/60 hover:border-indigo-500/50 shadow-sm active:scale-95'
                  }`}
                >
                  <span>{word.french}</span>
                  {isSpeaking && (
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Word Popover / Inspector Card */}
        {selectedWord && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/90 to-purple-950/90 border border-indigo-400/40 shadow-xl space-y-2 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-black text-indigo-300">
                  {selectedWord.french}
                </span>
                <button
                  onClick={(e) => handlePlayWord(selectedWord, selectedWordIndex!, e)}
                  className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center gap-1 transition-colors min-h-[36px]"
                >
                  <Volume2 size={14} />
                  <span>استمع</span>
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                {selectedWord.gender && selectedWord.gender !== '-' && (
                  <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 text-[11px] font-semibold border border-blue-500/30">
                    {selectedWord.gender}
                  </span>
                )}
                {selectedWord.number && selectedWord.number !== '-' && (
                  <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 text-[11px] font-semibold border border-purple-500/30">
                    {selectedWord.number}
                  </span>
                )}
              </div>
            </div>

            <div className="text-sm font-bold text-white flex items-center gap-2 pt-1 border-t border-indigo-500/20">
              <span className="text-indigo-300">الترجمة:</span>
              <span>{selectedWord.arabic}</span>
            </div>

            <div className="text-xs text-slate-300 flex items-center gap-2">
              <span className="text-indigo-300 font-semibold">الدور النحوي:</span>
              <span className="text-slate-200">{selectedWord.pos}</span>
            </div>
          </div>
        )}

        {/* Full Natural Arabic Translation */}
        <div className="p-4 rounded-2xl bg-[#0e1630] border border-slate-800 text-right space-y-1">
          <div className="text-xs font-semibold text-slate-400">الترجمة الطبيعية:</div>
          <p className="text-xl font-bold text-slate-100 leading-relaxed">
            {sentence.arabic}
          </p>
        </div>

        {/* Audio Controls Bar */}
        <div className="flex items-center justify-between gap-3 pt-2">
          {/* Full Pronunciation Button */}
          <button
            onClick={handlePlayFullSentence}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg min-h-[48px] active:scale-95 ${
              isPlayingFull
                ? 'bg-emerald-600 text-white shadow-emerald-900/40 ring-2 ring-emerald-400 animate-pulse'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/40'
            }`}
          >
            <Volume2 size={20} className={isPlayingFull ? 'animate-bounce' : ''} />
            <span>{isPlayingFull ? 'جاري النطق...' : 'النطق الكامل'}</span>
          </button>

          {/* Slow Speed Toggle */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-slate-900 border border-slate-800 shrink-0 min-h-[48px]">
            <span className="text-xs text-slate-300 font-medium">بطيء</span>
            <button
              onClick={() => setIsSlowSpeed(!isSlowSpeed)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 focus:outline-none ${
                isSlowSpeed ? 'bg-indigo-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  isSlowSpeed ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Cultural / Grammar Note Banner */}
      {sentence.cultural_note && (
        <div className="bg-gradient-to-r from-amber-950/40 to-yellow-950/20 border border-amber-500/30 rounded-2xl p-4 shadow-md space-y-2 text-right">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
            <Lightbulb size={18} />
            <span>ملاحظة ثقافية ونحوية مهمة</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed font-medium">
            {sentence.cultural_note}
          </p>
        </div>
      )}

      {/* Word-by-Word Breakdown Accordion */}
      <div className="bg-[#111933] border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
        <button
          onClick={() => setShowWordsBreakdown(!showWordsBreakdown)}
          className="w-full flex items-center justify-between p-4 text-slate-200 font-bold text-sm hover:bg-slate-800/40 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span>تفصيل الكلمات ({sentence.words.length} كلمات)</span>
          </div>
          {showWordsBreakdown ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {showWordsBreakdown && (
          <div className="p-3 pt-0 space-y-2 border-t border-slate-800/60">
            {sentence.words.map((word, wIdx) => {
              const isSelected = selectedWordIndex === wIdx;
              return (
                <div
                  key={wIdx}
                  onClick={() => handleWordClick(word, wIdx)}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-900/40 border-indigo-400/50 shadow-md'
                      : 'bg-[#0c1228] hover:bg-[#141d3d] border-slate-800/80'
                  }`}
                >
                  {/* Left: French Word & Audio */}
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={(e) => handlePlayWord(word, wIdx, e)}
                      className="p-2 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white transition-colors"
                      title="استمع"
                    >
                      <Volume2 size={15} />
                    </button>
                    <div className="text-left font-['Plus_Jakarta_Sans',sans-serif]">
                      <div className="text-base font-bold text-white">{word.french}</div>
                      <div className="text-[11px] text-slate-400">{word.pos}</div>
                    </div>
                  </div>

                  {/* Right: Arabic Meaning & Gender */}
                  <div className="text-right">
                    <div className="text-sm font-bold text-slate-200">{word.arabic}</div>
                    <div className="flex items-center justify-end gap-1 mt-0.5">
                      {word.gender && word.gender !== '-' && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-blue-300">
                          {word.gender}
                        </span>
                      )}
                      {word.number && word.number !== '-' && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-purple-300">
                          {word.number}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
