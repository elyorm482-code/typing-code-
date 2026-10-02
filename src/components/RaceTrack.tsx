import React from 'react';
import { User, Bot, Flag } from 'lucide-react';

interface RaceTrackProps {
  playerProgress: number; // 0 - 100
  playerWpm: number;
  botProgress: number; // 0 - 100
  botWpm: number;
  botName: string;
}

export const RaceTrack: React.FC<RaceTrackProps> = ({
  playerProgress,
  playerWpm,
  botProgress,
  botWpm,
  botName,
}) => {
  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-3 sm:p-4 space-y-3">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span className="font-semibold text-slate-200">Live Duel Progress</span>
        <div className="flex items-center gap-1.5 text-slate-400">
          <Flag className="w-3.5 h-3.5 text-emerald-400" />
          <span>Finish Line</span>
        </div>
      </div>

      {/* Player Lane */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold truncate">
            <span className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
              <User className="w-3 h-3" />
            </span>
            <span className="truncate">You (Player)</span>
          </div>
          <span className="tabular-nums font-semibold text-emerald-300 shrink-0">
            {playerWpm} WPM · {Math.round(playerProgress)}%
          </span>
        </div>

        {/* Track Bar */}
        <div className="relative w-full h-3 sm:h-3.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-150 ease-out"
            style={{ width: `${Math.min(100, Math.max(0, playerProgress))}%` }}
          />
        </div>
      </div>

      {/* Rival Ghost Bot Lane */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1.5 text-sky-400 font-medium truncate">
            <span className="w-5 h-5 rounded-md bg-sky-500/20 text-sky-300 flex items-center justify-center shrink-0">
              <Bot className="w-3 h-3" />
            </span>
            <span className="truncate">{botName} (Rival Ghost)</span>
          </div>
          <span className="tabular-nums text-slate-400 shrink-0">
            {botWpm} WPM · {Math.round(botProgress)}%
          </span>
        </div>

        {/* Track Bar */}
        <div className="relative w-full h-3 sm:h-3.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-sky-600 to-sky-400 rounded-full transition-all duration-200 ease-out"
            style={{ width: `${Math.min(100, Math.max(0, botProgress))}%` }}
          />
        </div>
      </div>
    </div>
  );
};
