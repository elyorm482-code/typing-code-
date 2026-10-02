import React, { useState } from 'react';
import { Menu, X, Volume2, VolumeX, Swords, Trophy, Code2, Flame, BarChart3 } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  activeTab: 'arena' | 'practice' | 'leaderboard' | 'analytics';
  setActiveTab: (tab: 'arena' | 'practice' | 'leaderboard' | 'analytics') => void;
  onQuickMatch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onQuickMatch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());

  const handleToggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const navLinks: { id: 'arena' | 'practice' | 'leaderboard' | 'analytics'; label: string; icon: React.ReactNode }[] = [
    { id: 'arena', label: 'Arena', icon: <Swords className="w-4 h-4" /> },
    { id: 'practice', label: 'Practice', icon: <Code2 className="w-4 h-4" /> },
    { id: 'leaderboard', label: 'Leaderboard', icon: <Trophy className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single element brand wordmark */}
        <button
          onClick={() => {
            setActiveTab('arena');
            setMobileMenuOpen(false);
          }}
          className="text-left font-bold text-xl sm:text-2xl tracking-tight text-white hover:text-emerald-400 transition-colors shrink-0 flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
          <span>CodeBattle</span>
        </button>

        {/* Zone 2: 4-5 clean single-line nav links (Desktop/Tablet) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`py-1 relative transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-emerald-400 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions + audio toggle + Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Mechanical Sound Toggle */}
          <button
            onClick={handleToggleSound}
            aria-label={isMuted ? 'Unmute typing clicks' : 'Mute typing clicks'}
            className="p-2 sm:p-2.5 rounded-lg border border-slate-800 bg-slate-900/60 text-slate-300 hover:text-white hover:border-slate-700 transition-colors touch-hitbox flex items-center justify-center"
            title={isMuted ? 'Audio Click: Muted' : 'Audio Click: Active (Synthesized)'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-slate-500" />
            ) : (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            )}
          </button>

          {/* Quick Duel CTA Button (Responsive) */}
          <button
            onClick={onQuickMatch}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm shadow-emerald-950/40 active:scale-[0.98] transition-all whitespace-nowrap"
          >
            <Flame className="w-4 h-4 text-slate-950 fill-slate-950" />
            <span>Instant Match</span>
          </button>

          {/* Mobile Hamburger Button with 44px+ touch hitbox */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg border border-slate-800 bg-slate-900/80 text-slate-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/98 backdrop-blur-xl px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200">
          <div className="space-y-1 mb-4">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full min-h-[44px] px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-3 transition-colors ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <span className={isActive ? 'text-emerald-400' : 'text-slate-400'}>
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800/80">
            <button
              onClick={() => {
                onQuickMatch();
                setMobileMenuOpen(false);
              }}
              className="w-full min-h-[48px] px-4 py-3 text-sm font-bold text-slate-950 bg-emerald-400 active:bg-emerald-300 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10"
            >
              <Flame className="w-4 h-4 fill-slate-950" />
              <span>Start Instant Duel</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
