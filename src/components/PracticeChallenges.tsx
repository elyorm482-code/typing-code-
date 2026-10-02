import React from 'react';
import { Terminal, Play, CheckCircle, ArrowRight } from 'lucide-react';
import { CODE_SNIPPETS } from '../data/snippets';
import { CodeSnippet } from '../types';

interface PracticeChallengesProps {
  currentSnippetId: string;
  onSelectSnippet: (snippet: CodeSnippet) => void;
}

export const PracticeChallenges: React.FC<PracticeChallengesProps> = ({
  currentSnippetId,
  onSelectSnippet,
}) => {
  return (
    <section className="w-full py-8 sm:py-12 bg-slate-900/40 border-t border-slate-800">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
              <Terminal className="w-4 h-4" />
              <span>Curated Battle Tracks</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Practice Challenges
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select specific language paradigms and algorithms to sharpen your keystroke reflex
            </p>
          </div>
        </div>

        {/* 
          RESPONSIVE GRID:
          - Mobile (1-column): grid-cols-1
          - Tablet (2-column): sm:grid-cols-2
          - Desktop (3-column): lg:grid-cols-3
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5">
          {CODE_SNIPPETS.map((item) => {
            const isSelected = item.id === currentSnippetId;
            return (
              <div
                key={item.id}
                className={`bg-slate-900/90 border rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all ${
                  isSelected
                    ? 'border-emerald-500 shadow-md shadow-emerald-950/40 ring-1 ring-emerald-500/30'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                      {item.language}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 capitalize">
                      {item.difficulty}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-1.5">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                    {item.description}
                  </p>

                  {/* Code snippet preview */}
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-[11px] sm:text-xs text-slate-400 overflow-hidden line-clamp-3 leading-snug">
                    <pre className="overflow-hidden">{item.code}</pre>
                  </div>
                </div>

                {/* Touch-Friendly Action Button */}
                <div className="pt-4 mt-2">
                  <button
                    onClick={() => onSelectSnippet(item)}
                    className={`w-full min-h-[44px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                      isSelected
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span>Active in Arena</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Load This Track</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
