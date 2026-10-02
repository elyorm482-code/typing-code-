import React, { useState } from 'react';
import { Trophy, Medal, Flame, Filter, Globe } from 'lucide-react';
import { INITIAL_LEADERBOARD } from '../data/snippets';
import { Language } from '../types';

interface LeaderboardSectionProps {
  userBestWpm: number;
}

export const LeaderboardSection: React.FC<LeaderboardSectionProps> = ({ userBestWpm }) => {
  const [selectedLang, setSelectedLang] = useState<Language | 'all'>('all');

  // Clone and update the guest entry with user's actual best score
  const leaderboardData = INITIAL_LEADERBOARD.map((item) => {
    if (item.username === 'you (guest)') {
      return {
        ...item,
        wpm: Math.max(item.wpm, userBestWpm),
      };
    }
    return item;
  }).sort((a, b) => b.wpm - a.wpm).map((item, idx) => ({ ...item, rank: idx + 1 }));

  const filteredData = selectedLang === 'all'
    ? leaderboardData
    : leaderboardData.filter((item) => item.language === selectedLang);

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <span className="text-amber-400 font-bold">#1</span>;
    if (rank === 2) return <span className="text-slate-300 font-bold">#2</span>;
    if (rank === 3) return <span className="text-amber-600 font-bold">#3</span>;
    return <span className="text-slate-500 font-mono">#{rank}</span>;
  };

  const getLanguageTagColor = (lang: Language) => {
    switch (lang) {
      case 'typescript': return 'text-sky-400';
      case 'javascript': return 'text-amber-300';
      case 'python': return 'text-emerald-400';
      case 'rust': return 'text-orange-400';
      case 'go': return 'text-teal-400';
      default: return 'text-purple-400';
    }
  };

  return (
    <section className="w-full py-8 sm:py-12 bg-slate-950/60 border-t border-slate-800/80">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
              <Trophy className="w-4 h-4" />
              <span>Global Developer Rankings</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Leaderboard Arena
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Top speed coders benchmarked across real-world syntax duels
            </p>
          </div>

          {/* Language Filter Tabs (Interactive Segmented Control) */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto scrollbar-none">
            {(['all', 'typescript', 'python', 'rust', 'go'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono capitalize whitespace-nowrap transition-colors min-h-[36px] flex items-center ${
                  selectedLang === lang
                    ? 'bg-slate-800 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* 
          RESPONSIVE DESIGN ADAPTATION:
          - Desktop (md:block): Comprehensive clean tabular layout with tabular-nums
          - Mobile (block md:hidden): Mobile Touch List Rows (No horizontal overflow)
        */}

        {/* Desktop / Tablet Table View */}
        <div className="hidden md:block bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
          <table className="w-full text-left text-sm font-mono">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-xs text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4 w-16 text-center">Rank</th>
                <th className="py-3.5 px-4">Developer</th>
                <th className="py-3.5 px-4">Language</th>
                <th className="py-3.5 px-4 text-right">Accuracy</th>
                <th className="py-3.5 px-4 text-right">Matches</th>
                <th className="py-3.5 px-4 text-right">Tier</th>
                <th className="py-3.5 px-6 text-right">Speed (WPM)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredData.map((row) => {
                const isUser = row.username.includes('guest');
                return (
                  <tr
                    key={row.username}
                    className={`hover:bg-slate-850/50 transition-colors ${
                      isUser ? 'bg-emerald-950/20 border-l-2 border-emerald-400' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 text-center font-bold text-base">
                      {getRankBadge(row.rank)}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        {/* Avatar with styled geometric initials fallback */}
                        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-emerald-400 uppercase">
                          {row.username.slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                            <span>{row.username}</span>
                            {isUser && (
                              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono">
                                YOU
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-500">{row.country}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`capitalize font-semibold ${getLanguageTagColor(row.language)}`}>
                        {row.language}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-300 tabular-nums">
                      {row.accuracy.toFixed(1)}%
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-400 tabular-nums">
                      {row.matchesPlayed}
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-300">
                      {row.tier}
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <span className="text-emerald-400 font-extrabold text-lg tabular-nums">
                        {row.wpm}
                      </span>
                      <span className="text-slate-500 text-xs ml-1">wpm</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Touch List Cards (Layout B from mobile reference) */}
        <div className="md:hidden space-y-2.5">
          {filteredData.map((row) => {
            const isUser = row.username.includes('guest');
            return (
              <div
                key={row.username}
                className={`bg-slate-900 border rounded-xl p-3.5 flex items-center justify-between gap-3 transition-colors ${
                  isUser
                    ? 'border-emerald-500/40 bg-emerald-950/20'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Left: Rank & Avatar & User Info */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 text-center font-bold font-mono text-sm shrink-0">
                    {getRankBadge(row.rank)}
                  </div>

                  <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-emerald-400 uppercase shrink-0">
                    {row.username.slice(0, 2)}
                  </div>

                  <div className="min-w-0">
                    <div className="font-semibold text-slate-200 text-xs sm:text-sm truncate flex items-center gap-1.5">
                      <span className="truncate">{row.username}</span>
                      {isUser && (
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1 py-0.5 rounded font-mono shrink-0">
                          YOU
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono mt-0.5">
                      <span className={`capitalize ${getLanguageTagColor(row.language)}`}>
                        {row.language}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{row.accuracy.toFixed(1)}% acc</span>
                    </div>
                  </div>
                </div>

                {/* Right: Big WPM metric */}
                <div className="text-right shrink-0">
                  <div className="text-lg sm:text-xl font-mono font-extrabold text-emerald-400 tabular-nums">
                    {row.wpm}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase">
                    WPM
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
