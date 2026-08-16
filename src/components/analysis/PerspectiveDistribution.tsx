import React from 'react';
import { Compass, PieChart as PieIcon, BarChart2 } from 'lucide-react';
import { cn } from '../../lib/utils.js';

export interface PerspectiveDistributionProps {
  distribution: Record<string, number>; // proportions or percentages
  percentageDistribution?: Record<string, number>;
  totalItems: number;
  dominantPerspective?: string;
  className?: string;
}

const PERSPECTIVE_COLORS: string[] = [
  'bg-blue-600',
  'bg-amber-500',
  'bg-purple-600',
  'bg-emerald-600',
  'bg-indigo-600',
  'bg-rose-500',
  'bg-teal-600',
];

export function PerspectiveDistribution({
  distribution,
  percentageDistribution,
  totalItems,
  dominantPerspective,
  className,
}: PerspectiveDistributionProps) {
  const entries = Object.entries(distribution).sort((a, b) => b[1] - a[1]);

  return (
    <section
      id="perspective-distribution-section"
      aria-labelledby="perspective-distribution-heading"
      className={cn(
        'bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs text-left space-y-6',
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
            <BarChart2 className="w-4 h-4 text-blue-600" aria-hidden="true" />
            <span>Dimension 1 • Viewpoint Distribution</span>
          </div>
          <h2
            id="perspective-distribution-heading"
            className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight"
          >
            WHAT DID YOU ENCOUNTER?
          </h2>
        </div>

        <div className="text-xs font-mono text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
          Total Feed Items: <strong className="text-slate-900">{totalItems}</strong>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
        The chart below illustrates the proportion of simulated articles and media pieces attributed
        to each perspective angle in your feed.
      </p>

      {/* Horizontal Bar Breakdown with Accessible Text */}
      <div className="space-y-4 pt-1">
        {entries.map(([perspective, value], index) => {
          // Normalize proportion vs percentage
          const pct =
            percentageDistribution && percentageDistribution[perspective] !== undefined
              ? percentageDistribution[perspective]
              : value <= 1
              ? Math.round(value * 100)
              : Math.round(value);

          const count = Math.round((pct / 100) * totalItems) || 1;
          const isDominant = perspective === dominantPerspective;
          const barColor = PERSPECTIVE_COLORS[index % PERSPECTIVE_COLORS.length];

          return (
            <div
              key={perspective}
              className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className={cn('w-3 h-3 rounded-full shrink-0', barColor)} />
                  <span className="font-bold text-slate-900">{perspective}</span>
                  {isDominant && (
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-mono font-bold uppercase tracking-wider">
                      Dominant ({(pct)}%)
                    </span>
                  )}
                </div>

                {/* Plain Text Readable Representation */}
                <div className="font-mono text-xs text-slate-700">
                  <strong className="text-slate-900">{pct}%</strong>{' '}
                  <span className="text-slate-500">
                    ({count} {count === 1 ? 'item' : 'items'})
                  </span>
                </div>
              </div>

              {/* Accessible Visual Bar */}
              <div
                className="w-full h-3 bg-white rounded-full overflow-hidden border border-slate-200 p-0.5"
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${perspective}: ${pct}% (${count} of ${totalItems} items)`}
              >
                <div
                  className={cn('h-full rounded-full transition-all duration-500', barColor)}
                  style={{ width: `${Math.max(4, pct)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
