import React from 'react';
import { Trophy, RotateCcw, SkipForward, CheckCircle2, AlertCircle, Zap, Flame, X } from 'lucide-react';
import { MatchStats, CodeSnippet } from '../types';

interface MatchResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: MatchStats;
  snippet: CodeSnippet;
  onRestart: () => void;
  onNextSnippet: () => void;
  botWpm: number;
}

export const MatchResultsModal: React.FC<MatchResultsModalProps> = ({
  isOpen,
  onClose,
  stats,
  snippet,
  onRestart,
  onNextSnippet,
  botWpm,
}) => {
  if (!isOpen) return null;

  const isVictory = stats.wpm >= botWpm;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-5 sm:p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button with 44px touch hitbox */}
        <button
          onClick={onClose}
          aria-label="Close match results"
          className="absolute top-3 right-3 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Result Status */}
        <div className="text-center space-y-2 pt-2 pb-4 border-b border-slate-800">
          <div className="inline-flex p-3 rounded-full bg-slate-800/80 ring-8 ring-slate-800/30 text-emerald-400 mx-auto">
            {isVictory ? (
              <Trophy className="w-8 h-8 text-amber-400" />
            ) : (
              <Zap className="w-8 h-8 text-sky-400" />
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            {isVictory ? 'Victory! You Out-Coded the Rival' : 'Good Match! Keep Practicing'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {snippet.title} · {snippet.language} ({stats.timeElapsed.toFixed(1)}s)
          </p>
        </div>

        {/* Primary Results Grid (Responsive 2x2 or 3-col) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4">
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-center">
            <span className="text-[11px] font-mono text-slate-400">Final Speed</span>
            <div className="text-2xl sm:text-3xl font-mono font-extrabold text-emerald-400 tabular-nums">
              {stats.wpm}
            </div>
            <span className="text-[10px] text-slate-500 font-mono">WPM</span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-center">
            <span className="text-[11px] font-mono text-slate-400">Accuracy</span>
            <div className="text-2xl sm:text-3xl font-mono font-extrabold text-sky-400 tabular-nums">
              {stats.accuracy.toFixed(1)}%
            </div>
            <span className="text-[10px] text-slate-500 font-mono">
              {stats.incorrectChars} typos
            </span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-center col-span-2 sm:col-span-1">
            <span className="text-[11px] font-mono text-slate-400">Streak Combo</span>
            <div className="text-2xl sm:text-3xl font-mono font-extrabold text-amber-400 tabular-nums">
              {stats.maxStreak}
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Max Keystrokes</span>
          </div>
        </div>

        {/* Comparative Duel Summary */}
        <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3.5 space-y-2 text-xs font-mono">
          <div className="flex justify-between items-center text-slate-300">
            <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Your Result
            </span>
            <span className="font-bold text-white tabular-nums">{stats.wpm} WPM</span>
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-sky-400 font-semibold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> Ghost Opponent
            </span>
            <span className="tabular-nums">{botWpm} WPM</span>
          </div>
        </div>

        {/* Action Buttons: Full width on mobile, inline on tablet/desktop */}
        <div className="mt-5 flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={() => {
              onRestart();
              onClose();
            }}
            className="min-h-[48px] flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] touch-hitbox"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <button
            onClick={() => {
              onNextSnippet();
              onClose();
            }}
            className="min-h-[48px] flex-1 px-4 py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 transition-all active:scale-[0.98] touch-hitbox"
          >
            <SkipForward className="w-4 h-4 fill-slate-950" />
            <span>Next Challenge</span>
          </button>
        </div>
      </div>
    </div>
  );
};
