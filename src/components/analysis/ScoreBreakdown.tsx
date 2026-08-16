import React from 'react';
import { Eye, Building2, LayoutTemplate, Scale } from 'lucide-react';
import { cn } from '../../lib/utils.js';
import type { DimensionBreakdown } from '../../../shared/types.js';

export interface ScoreBreakdownProps {
  viewpointScore: number;
  sourceScore: number;
  contentScore: number;
  breakdown?: {
    viewpoint: DimensionBreakdown;
    source: DimensionBreakdown;
    content: DimensionBreakdown;
  };
  className?: string;
}

export function ScoreBreakdown({
  viewpointScore,
  sourceScore,
  contentScore,
  breakdown,
  className,
}: ScoreBreakdownProps) {
  const cards = [
    {
      id: 'viewpoint-card',
      title: 'VIEWPOINT DIVERSITY',
      score: viewpointScore,
      weight: '50% Weight',
      icon: Eye,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
      borderColor: 'border-blue-200/80',
      categoriesCount: breakdown?.viewpoint.categoriesRepresented || 0,
      description:
        'Measures how evenly distinct analytical, stakeholder, and ideological perspectives were distributed across the feed.',
    },
    {
      id: 'source-card',
      title: 'SOURCE DIVERSITY',
      score: sourceScore,
      weight: '30% Weight',
      icon: Building2,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50',
      borderColor: 'border-emerald-200/80',
      categoriesCount: breakdown?.source.categoriesRepresented || 0,
      description:
        'Measures the variety of institutional sources represented, from policy institutes to research journals.',
    },
    {
      id: 'content-card',
      title: 'CONTENT DIVERSITY',
      score: contentScore,
      weight: '20% Weight',
      icon: LayoutTemplate,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-50',
      borderColor: 'border-purple-200/80',
      categoriesCount: breakdown?.content.categoriesRepresented || 0,
      description:
        'Measures the spread of narrative angles, thematic framings, and analytical focus areas across items.',
    },
  ];

  return (
    <section
      id="score-breakdown-section"
      aria-labelledby="score-breakdown-heading"
      className={cn('space-y-4 text-left', className)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-slate-100 text-slate-700">
            <Scale className="w-4 h-4" aria-hidden="true" />
          </div>
          <h3
            id="score-breakdown-heading"
            className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900"
          >
            Analytical Dimension Breakdown
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-500">Formula Weighting</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          const boundedScore = Math.max(0, Math.min(100, Math.round(card.score)));

          return (
            <div
              key={card.id}
              id={card.id}
              className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-2xs space-y-3.5 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                {/* Header with Icon & Weight */}
                <div className="flex items-center justify-between">
                  <div className={cn('p-2 rounded-lg', card.iconBg, card.iconColor)}>
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-mono font-bold text-slate-600">
                    {card.weight}
                  </span>
                </div>

                {/* Dimension Title & Score */}
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                    {card.title}
                  </h4>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                      {boundedScore}
                    </span>
                    <span className="text-sm font-semibold text-slate-400">/ 100</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div
                  className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60"
                  role="progressbar"
                  aria-valuenow={boundedScore}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${card.title}: ${boundedScore} out of 100`}
                >
                  <div
                    className="h-full bg-slate-900 rounded-full transition-all duration-500"
                    style={{ width: `${boundedScore}%` }}
                  />
                </div>

                {/* Explanation */}
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {card.description}
                </p>
              </div>

              {card.categoriesCount > 0 && (
                <div className="pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-500">
                  <span>{card.categoriesCount} distinct categories detected</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
