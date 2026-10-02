import React from 'react';
import { Play, Sparkles, Terminal, Shield, Zap, Flame, Trophy } from 'lucide-react';

interface HeroProps {
  onStartDuel: () => void;
  onExploreSnippets: () => void;
  topSpeed: number;
}

export const Hero: React.FC<HeroProps> = ({
  onStartDuel,
  onExploreSnippets,
  topSpeed,
}) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-8 sm:pt-10 sm:pb-12 lg:pt-14 lg:pb-16 border-b border-slate-800/60 bg-gradient-to-b from-slate-900/40 via-transparent to-transparent">
      {/* Background subtle grid pattern (low performance cost, CSS only) */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px),linear-gradient(to_bottom,#1e293b10_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none opacity-60"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline, subhead, and high-touch CTA buttons */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
            {/* Live Platform Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300 mx-auto lg:mx-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Multi-Device Competitive Typing Arena</span>
              <span className="text-slate-500">·</span>
              <span className="text-emerald-400 font-mono font-semibold">Live</span>
            </div>

            {/* Main Headline with responsive fluid sizing & balanced wrap */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] [text-wrap:balance]">
              Speed Code. Out-Type. <span className="text-emerald-400">Dominate</span> the Leaderboard.
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Test your real-world coding velocity against ghost racers, timed algorithms, and global developers. Engineered with zero-latency input for phones, tablets, and wide monitors.
            </p>

            {/* Primary Action Buttons: Stack full-width on mobile, inline on tablet/desktop */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onStartDuel}
                className="min-h-[48px] px-6 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm sm:text-base rounded-xl flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-500/10 active:scale-[0.98] transition-all touch-hitbox"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Jump Into Live Arena</span>
              </button>

              <button
                onClick={onExploreSnippets}
                className="min-h-[48px] px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 font-semibold text-sm sm:text-base rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all touch-hitbox"
              >
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Browse Code Snippets</span>
              </button>
            </div>

            {/* Quick Proof Metrics (Desktop & Mobile readable) */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Top Record: <strong className="text-white font-mono tabular-nums">{topSpeed} WPM</strong></span>
              </div>
              <span className="hidden sm:inline text-slate-700">·</span>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Real Syntax Parsing</span>
              </div>
              <span className="hidden sm:inline text-slate-700">·</span>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Zero Latency Loop</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Code Duel Card Preview (Scales responsive on PC & Tablet, subtle on Mobile) */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 sm:p-5 shadow-2xl relative">
              {/* Window Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400 truncate max-w-[140px] sm:max-w-none">
                    duel_match_preview.ts
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900/40">
                  TypeScript
                </span>
              </div>

              {/* Sample Visual Mock Race Progress */}
              <div className="space-y-3 font-mono text-xs">
                {/* Racer 1 */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <Flame className="w-3 h-3" /> You (Player)
                    </span>
                    <span className="text-white font-mono tabular-nums font-bold">118 WPM · 88%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div className="bg-emerald-400 h-full rounded-full w-[88%] transition-all" />
                  </div>
                </div>

                {/* Racer 2 (Ghost Bot) */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span className="text-sky-400 font-semibold flex items-center gap-1">
                      <Trophy className="w-3 h-3" /> Rival Ghost Bot
                    </span>
                    <span className="text-slate-300 font-mono tabular-nums">104 WPM · 76%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div className="bg-sky-400/80 h-full rounded-full w-[76%] transition-all" />
                  </div>
                </div>

                {/* Snippet Peek */}
                <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-[12px] sm:text-[13px] leading-relaxed overflow-x-auto text-slate-300">
                  <code>
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-blue-400">speedBattle</span> = (
                    <span className="text-amber-300">chars</span>:{' '}
                    <span className="text-teal-400">number</span>) =&gt; {'{'}{'\n'}
                    {'  '}<span className="text-purple-400">return</span> chars /{' '}
                    <span className="text-emerald-400 font-bold">5</span> *{' '}
                    <span className="text-sky-400 font-bold">60</span>;{'\n'}
                    {'}'};
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
