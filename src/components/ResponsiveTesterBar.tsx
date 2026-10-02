import React, { useState, useEffect } from 'react';
import { Smartphone, Tablet, Monitor, Maximize2, Minimize2, Eye, EyeOff } from 'lucide-react';
import { TestWidthOption } from '../types';

export const TEST_WIDTHS: TestWidthOption[] = [
  { width: 320, label: '320px', device: 'iPhone SE / Fold', category: 'mobile' },
  { width: 375, label: '375px', device: 'iPhone Mini / SE2', category: 'mobile' },
  { width: 390, label: '390px', device: 'iPhone 13 / 14', category: 'mobile' },
  { width: 430, label: '430px', device: 'iPhone 15 Pro Max', category: 'mobile' },
  { width: 768, label: '768px', device: 'iPad / Tablet Port.', category: 'tablet' },
  { width: 1024, label: '1024px', device: 'iPad Pro / Landscape', category: 'tablet' },
  { width: 1280, label: '1280px', device: 'Compact Laptop', category: 'desktop' },
  { width: 1440, label: '1440px', device: 'Desktop Standard', category: 'desktop' },
  { width: 1920, label: '1920px', device: 'Ultra-Wide Screen', category: 'desktop' },
];

interface ResponsiveTesterBarProps {
  currentTestWidth: number | null;
  onSelectWidth: (width: number | null) => void;
  actualWindowWidth: number;
}

export const ResponsiveTesterBar: React.FC<ResponsiveTesterBarProps> = ({
  currentTestWidth,
  onSelectWidth,
  actualWindowWidth,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const getBreakpointLabel = (w: number) => {
    if (w < 640) return 'xs (<640px)';
    if (w < 768) return 'sm (≥640px)';
    if (w < 1024) return 'md (≥768px)';
    if (w < 1280) return 'lg (≥1024px)';
    if (w < 1536) return 'xl (≥1280px)';
    return '2xl (≥1536px)';
  };

  const activeDisplayWidth = currentTestWidth || actualWindowWidth;

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-50 bg-slate-900/90 text-slate-300 hover:text-white border border-slate-700/60 shadow-lg px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 backdrop-blur-md transition-colors"
        title="Show Responsive Tester"
      >
        <Eye className="w-3.5 h-3.5 text-emerald-400" />
        <span>Tester ({activeDisplayWidth}px)</span>
      </button>
    );
  }

  return (
    <aside
      aria-label="Responsive Viewport Tester"
      className="sticky top-0 z-50 bg-slate-950/95 border-b border-slate-800 backdrop-blur-md text-xs font-mono select-none"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-1.5 flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
        {/* Left: Current Active Width & Breakpoint Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden sm:inline">Viewport:</span>
            <span className="tabular-nums font-bold text-slate-100">{activeDisplayWidth}px</span>
          </span>
          <span className="hidden md:inline-block text-slate-500">·</span>
          <span className="hidden md:inline-block text-slate-400 text-[11px]">
            {getBreakpointLabel(activeDisplayWidth)}
          </span>
          {currentTestWidth && (
            <button
              onClick={() => onSelectWidth(null)}
              className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 text-[10px] hover:bg-emerald-900/60 transition-colors"
            >
              Reset Full
            </button>
          )}
        </div>

        {/* Center: Device Preset Buttons (All 9 required widths) */}
        {!isCollapsed && (
          <div className="flex items-center gap-1 overflow-x-auto py-0.5 px-1 scrollbar-none">
            <button
              onClick={() => onSelectWidth(null)}
              className={`px-2 py-1 rounded text-[11px] whitespace-nowrap transition-all ${
                currentTestWidth === null
                  ? 'bg-slate-800 text-white font-semibold border border-slate-600'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
              title="Native 100% fluid view"
            >
              Full Auto
            </button>

            <span className="text-slate-700 mx-0.5">|</span>

            {TEST_WIDTHS.map((opt) => {
              const isSelected = currentTestWidth === opt.width;
              return (
                <button
                  key={opt.width}
                  onClick={() => onSelectWidth(opt.width)}
                  title={`${opt.device} (${opt.width}px)`}
                  className={`px-2 py-1 rounded text-[11px] whitespace-nowrap transition-all flex items-center gap-1 ${
                    isSelected
                      ? 'bg-emerald-600 text-white font-bold shadow-sm shadow-emerald-900'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80 border border-transparent'
                  }`}
                >
                  {opt.category === 'mobile' && <Smartphone className="w-3 h-3 opacity-70 shrink-0" />}
                  {opt.category === 'tablet' && <Tablet className="w-3 h-3 opacity-70 shrink-0" />}
                  {opt.category === 'desktop' && <Monitor className="w-3 h-3 opacity-70 shrink-0" />}
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Right: Collapse / Hide controls */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            title={isCollapsed ? 'Expand Widths' : 'Collapse Widths'}
          >
            {isCollapsed ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            title="Hide Tester Bar"
          >
            <EyeOff className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
