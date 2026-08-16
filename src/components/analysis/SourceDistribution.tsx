import React from 'react';
import { Building2 } from 'lucide-react';
import { cn } from '../../lib/utils.js';

export interface SourceDistributionProps {
  distribution: Record<string, number>;
  percentageDistribution?: Record<string, number>;
  totalItems: number;
  className?: string;
}

export function SourceDistribution({
  distribution,
  percentageDistribution,
  totalItems,
  className,
}: SourceDistributionProps) {
  const entries = Object.entries(distribution).sort((a, b) => b[1] - a[1]);

  return (
    <section
      id="source-distribution-section"
      aria-labelledby="source-distribution-heading"
      className={cn(
        'bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs text-left space-y-6',
        className
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
            <Building2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
            <span>Dimension 2 • Source Type Distribution</span>
          </div>
          <h3
            id="source-distribution-heading"
            className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight"
          >
            INSTITUTIONAL & SOURCE MIX
          </h3>
        </div>

        <span className="text-xs font-mono text-slate-500">
          {entries.length} Source {entries.length === 1 ? 'Category' : 'Categories'}
        </span>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
        Different institutions frame stories through differing investigative methodologies,
        incentives, and stakeholder priorities.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {entries.map(([sourceType, value]) => {
          const pct =
            percentageDistribution && percentageDistribution[sourceType] !== undefined
              ? percentageDistribution[sourceType]
              : value <= 1
              ? Math.round(value * 100)
              : Math.round(value);

          const count = Math.round((pct / 100) * totalItems) || 1;

          return (
            <div
              key={sourceType}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 truncate max-w-[180px]">{sourceType}</span>
                <span className="font-mono text-slate-600 font-semibold">
                  {pct}% ({count})
                </span>
              </div>

              <div
                className="w-full h-2 bg-white rounded-full overflow-hidden border border-slate-200"
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${sourceType}: ${pct}%`}
              >
                <div
                  className="h-full bg-emerald-600 rounded-full transition-all duration-500"
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
