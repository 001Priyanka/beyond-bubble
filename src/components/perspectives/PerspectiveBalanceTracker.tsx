import React from 'react';
import { CheckCircle2, History, Compass, Layers, Check } from 'lucide-react';
import { cn } from '../../lib/utils.js';
import type { PerspectiveDetail } from '../../../shared/types.js';

export interface PerspectiveBalanceTrackerProps {
  originalDistribution?: Record<string, number>; // percentages e.g. { "AI Optimistic": 60, "Worker Perspective": 20, ... }
  perspectives: PerspectiveDetail[];
  exploredPerspectives: string[];
  selectedPerspectiveName: string | null;
  className?: string;
}

export function PerspectiveBalanceTracker({
  originalDistribution = {},
  perspectives,
  exploredPerspectives,
  selectedPerspectiveName,
  className,
}: PerspectiveBalanceTrackerProps) {
  const exploredCount = perspectives.filter((p) =>
    exploredPerspectives.some((exp) => exp.toLowerCase() === p.name.toLowerCase())
  ).length;

  const totalCount = perspectives.length || 4;

  return (
    <section
      id="perspective-balance-tracker"
      aria-labelledby="balance-tracker-heading"
      className={cn(
        'bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5 text-left',
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
            <Layers className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h2 id="balance-tracker-heading" className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
              Perspective Balance & Exploration Progress
            </h2>
            <p className="text-xs text-slate-500 font-normal">
              Educational record of perspectives encountered during this simulation.
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-medium self-start sm:self-auto">
          <span>Explored:</span>
          <strong className="text-slate-900 font-bold">
            {exploredCount} of {totalCount}
          </strong>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Before Exploration (Original Simulated Feed Percentages) */}
        <div className="space-y-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
          <div className="flex items-center justify-between text-xs font-mono font-semibold text-slate-600">
            <span className="flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
              Before Exploration
            </span>
            <span className="text-[11px] text-slate-400">Original Feed Share</span>
          </div>

          <div className="space-y-2">
            {perspectives.map((p) => {
              const pct =
                originalDistribution[p.name] !== undefined
                  ? originalDistribution[p.name]
                  : 0;

              return (
                <div key={`before-${p.name}`} className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-700">
                    <span className="font-medium truncate max-w-[180px]">{p.name}</span>
                    <span className="font-mono font-semibold text-slate-900">{pct}%</span>
                  </div>
                  <div className="w-full bg-slate-200/80 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-slate-700 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${Math.max(pct, 2)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Perspectives Explored Status */}
        <div className="space-y-3 p-3.5 rounded-xl bg-blue-50/40 border border-blue-100">
          <div className="flex items-center justify-between text-xs font-mono font-semibold text-blue-900">
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
              Perspectives Explored
            </span>
            <span className="text-[11px] text-blue-600/80 font-normal">Active Session</span>
          </div>

          <div className="space-y-2">
            {perspectives.map((p) => {
              const isItemExplored = exploredPerspectives.some(
                (exp) => exp.toLowerCase() === p.name.toLowerCase()
              );
              const isCurrentlySelected =
                selectedPerspectiveName?.toLowerCase() === p.name.toLowerCase();

              return (
                <div
                  key={`explored-${p.name}`}
                  className={cn(
                    'flex items-center justify-between p-2 rounded-lg text-xs transition-colors',
                    isCurrentlySelected
                      ? 'bg-blue-100/80 text-blue-950 font-semibold border border-blue-200'
                      : isItemExplored
                      ? 'bg-white text-slate-800 border border-slate-200/80'
                      : 'bg-white/60 text-slate-400 border border-slate-100'
                  )}
                >
                  <div className="flex items-center gap-2 truncate">
                    {isItemExplored ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                    )}
                    <span className="truncate">{p.name}</span>
                  </div>

                  <span className="text-[11px] font-mono shrink-0 ml-2">
                    {isCurrentlySelected ? (
                      <span className="text-blue-700 font-bold uppercase tracking-wider text-[10px]">
                        Active
                      </span>
                    ) : isItemExplored ? (
                      <span className="text-emerald-700 font-medium">Explored</span>
                    ) : (
                      <span className="text-slate-400">Unexplored</span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>

          {selectedPerspectiveName && (
            <p className="text-[11px] text-slate-600 pt-1 font-medium">
              You've currently focused on the <strong className="text-slate-900">{selectedPerspectiveName}</strong>.
            </p>
          )}
        </div>
      </div>

      <div className="text-[11px] text-slate-500 border-t border-slate-100 pt-2 font-mono">
        Note: This is an educational progress tracker. Exploring perspectives expands information awareness
        without implying agreement or measuring ideological shift.
      </div>
    </section>
  );
}
