import { INITIAL_SENTENCES } from '../data/initialSentences';

export function generateStandaloneHTML(customSentences: any[] = []): string {
  const allSentences = [...customSentences, ...INITIAL_SENTENCES];
  const payload = JSON.stringify(allSentences).replace(/</g, '\\u003c');

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>تعلم الفرنسية - منصة تفاعلية للناطقين بالعربية</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Cairo', sans-serif; }
    .fr-font { font-family: 'Plus Jakarta Sans', sans-serif; }
  </style>
</head>
<body class="bg-[#080d1a] text-slate-100 min-h-screen pb-24">
  <div id="app" class="max-w-md mx-auto min-h-screen px-4 pt-4">
    <!-- Standalone Single-File Interactive Platform Content -->
    <header class="text-center py-6 border-b border-slate-800">
      <div class="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs mb-2">
        <span>🇫🇷</span>
        <span>تعلم الفرنسية التفاعلي</span>
      </div>
      <h1 class="text-2xl font-black text-white">خطوة بخطوة نحو التحدث بطلاقة</h1>
      <p class="text-xs text-slate-400 mt-1">نسخة مستقلة جاهزة للعمل في أي متصفح دون خادم</p>
    </header>

    <main id="content" class="mt-6 space-y-4">
      <!-- Sentence List rendered by JS -->
    </main>
  </div>

  <script>
    const sentences = ${payload};
    let currentSlow = false;
    let activeWordIndex = null;
    let activeSentenceId = null;

    function speak(text, slow = false) {
      if (!('speechSynthesis' in window)) return alert('المتصفح لا يدعم الصوت');
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'fr-FR';
      u.rate = slow ? 0.65 : 0.95;
      window.speechSynthesis.speak(u);
    }

    function render() {
      const container = document.getElementById('content');
      container.innerHTML = sentences.map((s, idx) => \`
        <div class="bg-[#12192e] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <div class="flex items-center justify-between text-xs text-slate-400">
            <span class="px-2.5 py-1 rounded-lg bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 font-medium">\${s.category}</span>
            <span class="px-2 py-0.5 rounded bg-slate-800 text-slate-300">\${s.register}</span>
          </div>

          <div class="flex flex-wrap gap-2 items-center fr-font text-lg font-bold text-white py-1">
            \${s.words.map((w, wIdx) => \`
              <button onclick="inspectWord(\\\${idx}, \\\${wIdx})" class="px-2.5 py-1 bg-slate-800/80 hover:bg-indigo-600 rounded-lg text-slate-100 hover:text-white transition-all text-base border border-slate-700/60 active:scale-95">
                \${w.french}
              </button>
            \`).join('')}
            <button onclick="speak('\${s.french.replace(/'/g, "\\\\'")}', false)" class="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md active:scale-95 mr-auto">
              🔊
            </button>
          </div>

          <div class="text-slate-200 font-semibold text-base border-t border-slate-800/80 pt-3">
            \${s.arabic}
          </div>

          <div id="word-detail-\${idx}" class="hidden p-3 bg-indigo-950/40 border border-indigo-500/20 rounded-xl text-xs space-y-1">
          </div>

          <div class="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-200/90 leading-relaxed">
            💡 \${s.cultural_note}
          </div>
        </div>
      \`).join('');
    }

    window.inspectWord = function(sIdx, wIdx) {
      const s = sentences[sIdx];
      const w = s.words[wIdx];
      const box = document.getElementById('word-detail-' + sIdx);
      if (!box) return;
      box.className = 'p-3 bg-indigo-950/50 border border-indigo-500/30 rounded-xl text-xs space-y-1.5 animate-fadeIn';
      box.innerHTML = \`
        <div class="flex items-center justify-between font-bold text-indigo-300">
          <span class="fr-font text-sm">\${w.french}</span>
          <button onclick="speak('\${w.french.replace(/'/g, "\\\\'")}', true)" class="px-2 py-0.5 rounded bg-indigo-600 text-white text-[11px]">🔊 نطق</button>
        </div>
        <div class="text-white font-medium">الترجمة: \${w.arabic}</div>
        <div class="text-slate-300">النوع النحوي: \${w.pos} \${w.gender ? '· الجنس: ' + w.gender : ''} \${w.number ? '· العدد: ' + w.number : ''}</div>
      \`;
      speak(w.french, false);
    };

    render();
  </script>
</body>
</html>`;
}
