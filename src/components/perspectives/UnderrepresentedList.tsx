import React from 'react';
import { ArrowRight, Compass, CheckCircle2, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils.js';
import type { PerspectiveDetail, UnderrepresentedPerspective } from '../../../shared/types.js';

export interface UnderrepresentedListProps {
  perspectives: PerspectiveDetail[];
  underrepresentedPerspectives?: UnderrepresentedPerspective[];
  feedDistribution?: Record<string, number>; // percentages
  selectedPerspectiveId: string | null;
  exploredPerspectives: string[];
  onSelectPerspective: (perspectiveId: string) => void;
  className?: string;
}

export function UnderrepresentedList({
  perspectives,
  underrepresentedPerspectives = [],
  feedDistribution = {},
  selectedPerspectiveId,
  exploredPerspectives,
  onSelectPerspective,
  className,
}: UnderrepresentedListProps) {
  // Map perspectives into presentation cards with their respective percentage share
  const itemsToDisplay = perspectives.map((p) => {
    const underrepMatch = underrepresentedPerspectives.find(
      (u) => u.perspective.toLowerCase() === p.name.toLowerCase()
    );
    const feedPct =
      feedDistribution[p.name] !== undefined
        ? feedDistribution[p.name]
        : underrepMatch
        ? underrepMatch.percentage
        : 0;

    const isUnderrepresented = underrepMatch !== undefined || feedPct < 25;
    const isExplored = exploredPerspectives.some(
      (exp) => exp.toLowerCase() === p.name.toLowerCase()
    );
    const isSelected =
      selectedPerspectiveId?.toLowerCase() === p.id.toLowerCase() ||
      selectedPerspectiveId?.toLowerCase() === p.name.toLowerCase();

    return {
      detail: p,
      percentage: feedPct,
      isUnderrepresented,
      isExplored,
      isSelected,
    };
  });

  return (
    <section
      id="underrepresented-perspectives-list"
      aria-labelledby="underrepresented-heading"
      className={cn('space-y-4 text-left', className)}
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-slate-200/80 pb-3">
        <div>
          <h2
            id="underrepresented-heading"
            className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 font-serif"
          >
            AVAILABLE PERSPECTIVES FOR EXPLORATION
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-normal">
            Select an underrepresented or alternative viewpoint below to examine its key arguments,
            underlying priorities, and simulated source material.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {itemsToDisplay.map(({ detail, percentage, isUnderrepresented, isExplored, isSelected }) => {
          return (
            <div
              key={detail.id}
              className={cn(
                'rounded-2xl p-5 sm:p-6 transition-all duration-200 flex flex-col justify-between relative border text-left',
                isSelected
                  ? 'bg-blue-50/50 border-blue-600 ring-2 ring-blue-600/20 shadow-sm'
                  : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
              )}
            >
              <div className="space-y-3">
                {/* Header Metadata */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      'text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full border',
                      isUnderrepresented
                        ? 'bg-amber-50 text-amber-800 border-amber-200/80'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    )}
                  >
                    {percentage}% of your simulated feed
                  </span>

                  {isExplored && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" aria-hidden="true" />
                      Explored
                    </span>
                  )}
                </div>

                {/* Perspective Name */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 uppercase tracking-wide font-serif">
                  {detail.name}
                </h3>

                {/* Short Neutral Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {detail.shortDescription}
                </p>

                {/* Why It Matters Callout */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500">
                    Why it matters:
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-normal">
                    {detail.whyItMatters}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">
                  {isSelected ? 'Currently Viewing' : 'Controlled content'}
                </span>

                <button
                  type="button"
                  id={`explore-btn-${detail.id}`}
                  onClick={() => onSelectPerspective(detail.id)}
                  className={cn(
                    'inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs',
                    isSelected
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  )}
                  aria-pressed={isSelected}
                >
                  <span>{isSelected ? 'Active Perspective' : 'Explore perspective'}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
