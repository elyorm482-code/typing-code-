import React, { useRef, useEffect } from 'react';
import { RotateCcw, SkipForward, Sparkles, CheckCircle2, AlertCircle, Keyboard, Zap } from 'lucide-react';
import { CodeSnippet, Language, Difficulty, MatchStats } from '../types';

interface CodeEditorAreaProps {
  snippet: CodeSnippet;
  userInput: string;
  onInputChange: (val: string) => void;
  stats: MatchStats;
  onRestart: () => void;
  onNextSnippet: () => void;
  onSelectLanguage: (lang: Language) => void;
  onSelectDifficulty: (diff: Difficulty) => void;
}

export const CodeEditorArea: React.FC<CodeEditorAreaProps> = ({
  snippet,
  userInput,
  onInputChange,
  stats,
  onRestart,
  onNextSnippet,
  onSelectLanguage,
  onSelectDifficulty,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const activeCharRef = useRef<HTMLSpanElement>(null);

  // Focus input when clicking anywhere inside the code box
  const handleEditorClick = () => {
    inputRef.current?.focus();
  };

  // Keep cursor visible by scrolling if needed
  useEffect(() => {
    if (activeCharRef.current) {
      activeCharRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }
  }, [userInput.length]);

  const targetCode = snippet.code;
  const currentIdx = userInput.length;

  // Mobile quick helper symbols for touch screens
  const quickSymbols = ['{', '}', '(', ')', ';', '=>', '=', ':', '.', '[', ']', '"', "'", '<', '>'];

  const handleInsertSymbol = (symbol: string) => {
    if (stats.isCompleted) return;
    const nextInput = userInput + symbol;
    onInputChange(nextInput);
    inputRef.current?.focus();
  };

  // Languages list
  const availableLanguages: { id: Language; label: string }[] = [
    { id: 'typescript', label: 'TypeScript' },
    { id: 'javascript', label: 'JavaScript' },
    { id: 'python', label: 'Python' },
    { id: 'rust', label: 'Rust' },
    { id: 'go', label: 'Go' },
    { id: 'css', label: 'CSS' },
  ];

  return (
    <div className="w-full">
      {/* 
        DESKTOP vs TABLET/MOBILE:
        On desktop (lg:grid-cols-12): Editor is 8 cols, telemetry side-panel is 4 cols.
        On mobile/tablet: Stacked 1-col layout with optimized touch spacing.
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
        {/* Main Code Editor Box */}
        <div className="lg:col-span-8 flex flex-col bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Editor Header Bar */}
          <div className="bg-slate-950/90 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2.5">
            {/* Left: Window Dots & Title */}
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs sm:text-sm font-mono font-medium text-slate-300 truncate">
                {snippet.title}
              </span>
            </div>

            {/* Right: Controls (Language Selector, Difficulty & Actions) */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Language Selector Dropdown */}
              <select
                aria-label="Select Code Language"
                value={snippet.language}
                onChange={(e) => onSelectLanguage(e.target.value as Language)}
                className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2 sm:px-2.5 py-1 sm:py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
              >
                {availableLanguages.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.label}
                  </option>
                ))}
              </select>

              {/* Difficulty Selector */}
              <div className="hidden sm:flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-[11px] font-mono">
                {(['beginner', 'intermediate', 'expert'] as Difficulty[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => onSelectDifficulty(d)}
                    className={`px-2 py-1 rounded transition-colors capitalize ${
                      snippet.difficulty === d
                        ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {d === 'intermediate' ? 'Med' : d}
                  </button>
                ))}
              </div>

              {/* Restart button with min touch target */}
              <button
                onClick={onRestart}
                aria-label="Restart Current Snippet"
                className="p-1.5 sm:p-2 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-750 transition-colors touch-hitbox flex items-center justify-center"
                title="Restart Snippet (Ctrl/Cmd+R)"
              >
                <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-300" />
              </button>

              {/* Next snippet button */}
              <button
                onClick={onNextSnippet}
                aria-label="Load Next Snippet"
                className="p-1.5 sm:p-2 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-750 transition-colors touch-hitbox flex items-center justify-center"
                title="Next Snippet"
              >
                <SkipForward className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
              </button>
            </div>
          </div>

          {/* Typing Area Canvas */}
          <div
            onClick={handleEditorClick}
            className="relative p-4 sm:p-6 lg:p-7 min-h-[220px] sm:min-h-[260px] max-h-[460px] overflow-y-auto cursor-text bg-slate-950 font-mono text-sm sm:text-base lg:text-[17px] leading-relaxed select-none focus-within:ring-2 focus-within:ring-emerald-500/30 transition-all"
          >
            {/* Hidden Input for Real Keystroke Capture (handles mobile soft keyboard + desktop keyboard) */}
            <input
              ref={inputRef}
              type="text"
              inputMode="text"
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              value={userInput}
              onChange={(e) => onInputChange(e.target.value)}
              disabled={stats.isCompleted}
              className="absolute inset-0 opacity-0 cursor-text w-full h-full z-10"
              aria-label="Type code here to race"
            />

            {/* Rendered Syntax Stream */}
            <div className="whitespace-pre-wrap break-all sm:break-normal font-mono relative">
              {targetCode.split('').map((expectedChar, idx) => {
                let charStyle = 'text-slate-500'; // Default untyped
                let isCurrent = idx === currentIdx;

                if (idx < currentIdx) {
                  const typedChar = userInput[idx];
                  if (typedChar === expectedChar) {
                    charStyle = 'text-emerald-400 font-semibold';
                  } else {
                    charStyle = 'text-rose-400 bg-rose-950/60 underline decoration-rose-500 decoration-2';
                  }
                }

                return (
                  <span
                    key={idx}
                    ref={isCurrent ? activeCharRef : null}
                    className={`relative ${charStyle} transition-colors duration-75`}
                  >
                    {/* Blinking Cursor on Active Character */}
                    {isCurrent && !stats.isCompleted && (
                      <span className="inline-block w-2 sm:w-2.5 h-4 sm:h-5 bg-emerald-400 align-middle -mt-1 animate-pulse" />
                    )}
                    {expectedChar === '\n' ? (
                      // Render newline with subtle carriage return marker
                      <span>{'\n'}</span>
                    ) : (
                      expectedChar
                    )}
                  </span>
                );
              })}

              {/* Trailing cursor if input exceeds snippet */}
              {currentIdx >= targetCode.length && !stats.isCompleted && (
                <span className="inline-block w-2 sm:w-2.5 h-4 sm:h-5 bg-emerald-400 align-middle -mt-1 animate-pulse" />
              )}
            </div>

            {/* Click-to-focus prompt overlay when empty */}
            {userInput.length === 0 && (
              <div className="mt-4 pt-3 border-t border-slate-900 text-xs text-slate-500 flex items-center gap-2">
                <Keyboard className="w-3.5 h-3.5 text-emerald-400" />
                <span>Click anywhere or tap below to start typing</span>
              </div>
            )}
          </div>

          {/* Mobile-Friendly Quick Coding Symbols Toolbar (Optimized for Touch Screens) */}
          <div className="bg-slate-950/95 border-t border-slate-800/80 px-2 sm:px-4 py-2 flex items-center justify-between gap-1 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-1 shrink-0 text-[11px] text-slate-400 font-mono pr-1">
              <span className="hidden sm:inline">Touch Quick-Keys:</span>
              <span className="sm:hidden">Symbols:</span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-none">
              {quickSymbols.map((sym) => (
                <button
                  key={sym}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInsertSymbol(sym);
                  }}
                  className="px-2.5 py-1.5 min-w-[36px] sm:min-w-[38px] min-h-[36px] sm:min-h-[38px] rounded-lg bg-slate-900 hover:bg-slate-800 active:bg-emerald-500 active:text-slate-950 text-slate-200 border border-slate-800 hover:border-slate-700 text-xs font-mono font-bold flex items-center justify-center transition-all select-none shadow-sm"
                  title={`Insert ${sym}`}
                >
                  {sym}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side-by-Side Telemetry & Live Analysis (Desktop: 4 cols, Tablet/Mobile: stacked) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Match Analysis Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-bold text-white">Live Telemetry</h2>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                {targetCode.length - userInput.length} chars left
              </span>
            </div>

            {/* Key Keystroke Metrics */}
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Correct Keystrokes
                </span>
                <span className="font-bold text-emerald-400 tabular-nums">
                  {stats.correctChars}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                  Error Count
                </span>
                <span className="font-bold text-rose-400 tabular-nums">
                  {stats.incorrectChars}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Progress</span>
                <span className="font-bold text-white tabular-nums">
                  {targetCode.length > 0
                    ? Math.round((Math.min(targetCode.length, userInput.length) / targetCode.length) * 100)
                    : 0}%
                </span>
              </div>

              {/* Progress visual bar */}
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-100"
                  style={{
                    width: `${
                      targetCode.length > 0
                        ? Math.min(100, (userInput.length / targetCode.length) * 100)
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            {/* Speed Tip / Ergonomic Note */}
            <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-400 flex items-start gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong className="text-slate-300">Pro tip:</strong> On mobile devices, use the touch symbol bar to hit braces and semicolons without shifting keyboards!
              </p>
            </div>
          </div>

          {/* Snippet Details Card */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">{snippet.title}</span>
              <span className="text-emerald-400 font-mono capitalize">
                {snippet.language} · {snippet.difficulty}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {snippet.description}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] text-slate-500 font-mono">
              {snippet.tags.map((t) => (
                <span key={t}>#{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
