import React from 'react';
import { cn } from '../../lib/utils.js';

export interface ExpandingBubbleVisualProps {
  className?: string;
  perspectivesCount?: number;
}

export function ExpandingBubbleVisual({
  className,
  perspectivesCount = 4,
}: ExpandingBubbleVisualProps): React.JSX.Element {
  return (
    <div
      id="expanding-bubble-visual"
      aria-hidden="true"
      className={cn('relative w-full max-w-sm mx-auto h-48 sm:h-56 flex items-center justify-center', className)}
    >
      {/* Outer Expansive Ring (Perspective Landscape) */}
      <div className="absolute inset-0 rounded-full border border-dashed border-blue-200/80 bg-gradient-to-tr from-blue-50/40 via-indigo-50/20 to-slate-50/10 animate-pulse duration-1000" />

      {/* Mid Layer Ring (Underrepresented Horizons) */}
      <div className="absolute w-3/4 h-3/4 rounded-full border border-blue-300/60 bg-blue-50/30 shadow-xs" />

      {/* Core Seed Ring (Initial Bubble) */}
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-blue-600 bg-white/90 shadow-sm flex flex-col items-center justify-center p-2 text-center backdrop-blur-xs">
        <span className="font-mono text-[10px] font-black uppercase tracking-wider text-blue-600">
          HORIZON
        </span>
        <span className="text-xs font-bold text-slate-800 leading-tight">
          Expanded View
        </span>
      </div>

      {/* Orbiting perspective markers */}
      <div className="absolute top-2 left-1/4 px-2 py-0.5 rounded-full bg-sky-100/90 border border-sky-200 text-sky-800 text-[10px] font-mono font-semibold shadow-xs">
        Academic
      </div>

      <div className="absolute bottom-2 right-1/4 px-2 py-0.5 rounded-full bg-amber-100/90 border border-amber-200 text-amber-800 text-[10px] font-mono font-semibold shadow-xs">
        Workforce
      </div>

      <div className="absolute top-1/3 right-2 px-2 py-0.5 rounded-full bg-emerald-100/90 border border-emerald-200 text-emerald-800 text-[10px] font-mono font-semibold shadow-xs">
        Industry
      </div>

      <div className="absolute bottom-1/3 left-2 px-2 py-0.5 rounded-full bg-purple-100/90 border border-purple-200 text-purple-800 text-[10px] font-mono font-semibold shadow-xs">
        Ethics
      </div>
    </div>
  );
}
