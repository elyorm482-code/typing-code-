import React from 'react';
import { Github, Globe, Code2, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 py-8 sm:py-12 text-slate-400 text-xs font-mono">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-slate-800/60">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base tracking-tight font-sans">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>CodeBattle</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed font-sans">
              The high-velocity developer typing arena. Built for precision, speed, and real syntax mechanics across every screen format.
            </p>
          </div>

          {/* Supported Languages */}
          <div className="space-y-2">
            <div className="text-white font-semibold font-sans text-sm">Languages</div>
            <ul className="space-y-1 text-slate-400">
              <li>TypeScript & JavaScript</li>
              <li>Python 3 Modern Syntax</li>
              <li>Rust Systems Syntax</li>
              <li>Go Concurrency & Channels</li>
              <li>CSS3 Modern Grid & Flex</li>
            </ul>
          </div>

          {/* Breakpoint Specs */}
          <div className="space-y-2">
            <div className="text-white font-semibold font-sans text-sm">Tested Breakpoints</div>
            <ul className="space-y-1 text-slate-400">
              <li>Mobile: 320px · 375px · 390px · 430px</li>
              <li>Tablet: 768px · 1024px</li>
              <li>Desktop: 1280px · 1440px · 1920px</li>
              <li>Zero Horizontal Scroll Tested</li>
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <div className="text-white font-semibold font-sans text-sm">Community</div>
            <ul className="space-y-1 text-slate-400">
              <li>Global Leaderboard</li>
              <li>Weekly Developer Duels</li>
              <li>Mechanical Switch Sounds</li>
              <li>Touch-Optimized Symbol Keypad</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-sans">
          <div>
            © {new Date().getFullYear()} CodeBattle. Crafted for full responsive performance.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-400 font-mono">100% Fluid Responsive</span>
            <span>·</span>
            <span className="text-slate-400">WCAG AA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
