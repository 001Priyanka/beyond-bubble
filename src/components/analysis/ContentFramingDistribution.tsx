import React from 'react';
import { LayoutTemplate, Layers } from 'lucide-react';
import { cn } from '../../lib/utils.js';

export interface ContentFramingDistributionProps {
  distribution: Record<string, number>;
  percentageDistribution?: Record<string, number>;
  totalItems: number;
  className?: string;
}

export function ContentFramingDistribution({
  distribution,
  percentageDistribution,
  totalItems,
  className,
}: ContentFramingDistributionProps) {
  const entries = Object.entries(distribution).sort((a, b) => b[1] - a[1]);

  return (
    <section
      id="content-framing-section"
      aria-labelledby="content-framing-heading"
      className={cn(
        'bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs text-left space-y-6',
        className
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
            <LayoutTemplate className="w-4 h-4 text-purple-600" aria-hidden="true" />
            <span>Dimension 3 • Content Framing & Narrative Angles</span>
          </div>
          <h3
            id="content-framing-heading"
            className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight"
          >
            NARRATIVE FRAMING DIVERSITY
          </h3>
        </div>

        <span className="text-xs font-mono text-slate-500">
          {entries.length} Unique {entries.length === 1 ? 'Framing' : 'Framings'}
        </span>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
        Framing refers to the specific angle or thematic lens through which an issue is presented.
        A high score reflects a healthy variety of narrative lenses rather than repetitive themes.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {entries.map(([framing, value]) => {
          const pct =
            percentageDistribution && percentageDistribution[framing] !== undefined
              ? percentageDistribution[framing]
              : value <= 1
              ? Math.round(value * 100)
              : Math.round(value);

          return (
            <div
              key={framing}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-xs gap-2">
                <span className="font-bold text-slate-800 line-clamp-1">{framing}</span>
                <span className="font-mono text-purple-700 font-bold shrink-0">{pct}%</span>
              </div>

              <div
                className="w-full h-1.5 bg-white rounded-full overflow-hidden border border-slate-200"
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${framing}: ${pct}%`}
              >
                <div
                  className="h-full bg-purple-600 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(6, pct)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
