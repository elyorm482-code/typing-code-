import React from 'react';
import { Gauge, Target, Timer, Flame, Award } from 'lucide-react';
import { MatchStats } from '../types';

interface StatsGridProps {
  stats: MatchStats;
  bestWpm: number;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats, bestWpm }) => {
  // Determine performance color
  const getWpmColor = (wpm: number) => {
    if (wpm >= 110) return 'text-purple-400';
    if (wpm >= 80) return 'text-emerald-400';
    if (wpm >= 50) return 'text-sky-400';
    return 'text-amber-400';
  };

  const getAccuracyColor = (acc: number) => {
    if (acc >= 98) return 'text-emerald-400';
    if (acc >= 92) return 'text-sky-400';
    if (acc >= 85) return 'text-amber-400';
    return 'text-rose-400';
  };

  const statCards = [
    {
      id: 'wpm',
      label: 'Live WPM',
      value: stats.wpm,
      suffix: '',
      colorClass: getWpmColor(stats.wpm),
      icon: <Gauge className="w-4 h-4 text-emerald-400" />,
      subtext: `Raw: ${stats.rawWpm} wpm`,
    },
    {
      id: 'accuracy',
      label: 'Accuracy',
      value: `${stats.accuracy.toFixed(1)}%`,
      suffix: '',
      colorClass: getAccuracyColor(stats.accuracy),
      icon: <Target className="w-4 h-4 text-sky-400" />,
      subtext: `${stats.incorrectChars} typos`,
    },
    {
      id: 'time',
      label: 'Time',
      value: `${stats.timeElapsed.toFixed(1)}s`,
      suffix: '',
      colorClass: 'text-amber-400',
      icon: <Timer className="w-4 h-4 text-amber-400" />,
      subtext: stats.isCompleted ? 'Finished' : 'In progress',
    },
    {
      id: 'streak',
      label: 'Combo Streak',
      value: stats.streak,
      suffix: '',
      colorClass: stats.streak > 20 ? 'text-emerald-400' : 'text-slate-200',
      icon: <Flame className={`w-4 h-4 ${stats.streak > 20 ? 'text-amber-400' : 'text-slate-400'}`} />,
      subtext: `Max: ${stats.maxStreak} streak`,
    },
    {
      id: 'best',
      label: 'Best Record',
      value: `${bestWpm}`,
      suffix: ' WPM',
      colorClass: 'text-purple-400',
      icon: <Award className="w-4 h-4 text-purple-400" />,
      subtext: 'Session peak',
      desktopOnlySpan: false,
    },
  ];

  return (
    <div className="w-full">
      {/* 
        Responsive Breakpoints:
        Mobile (< 640px): 2 columns or compact 1-col on very narrow (320px) screens
        Tablet (640px - 1024px): 4-columns or 2x2 layout
        Desktop (>= 1024px): 5 horizontal cards row with equal breathing room
      */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3.5 lg:gap-4">
        {statCards.map((card, idx) => (
          <div
            key={card.id}
            className={`bg-slate-900/90 border border-slate-800 rounded-xl p-3 sm:p-4 flex flex-col justify-between transition-all hover:border-slate-700/80 shadow-sm ${
              idx === 4 ? 'col-span-2 sm:col-span-2 md:col-span-4 lg:col-span-1' : ''
            }`}
          >
            {/* Header: Label + Functional Icon */}
            <div className="flex items-center justify-between gap-1 text-slate-400 text-xs mb-1">
              <span className="font-medium truncate">{card.label}</span>
              <span className="shrink-0">{card.icon}</span>
            </div>

            {/* Metric Value: Large responsive tabular typography */}
            <div className="my-0.5">
              <span
                className={`text-2xl sm:text-3xl lg:text-3xl font-extrabold font-mono tabular-nums tracking-tight ${card.colorClass}`}
              >
                {card.value}
              </span>
              {card.suffix && (
                <span className="text-xs text-slate-500 font-mono font-medium ml-1">
                  {card.suffix}
                </span>
              )}
            </div>

            {/* Subtext: Unboxed metadata */}
            <div className="text-[11px] text-slate-400 font-mono truncate">
              {card.subtext}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
