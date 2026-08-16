import React from 'react';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../shared/constants.js';
import { cn } from '../../lib/utils.js';
import type {
  UnderrepresentedPerspective,
  Topic,
  SimulationFeedResponse,
  AnalysisResponse,
} from '../../../shared/types.js';

export interface MissingPerspectivesProps {
  underrepresentedPerspectives: UnderrepresentedPerspective[];
  topic: Topic | null;
  simulationData?: SimulationFeedResponse | null;
  analysisData?: AnalysisResponse | null;
  className?: string;
}

export function MissingPerspectives({
  underrepresentedPerspectives,
  topic,
  simulationData,
  analysisData,
  className,
}: MissingPerspectivesProps) {
  return (
    <section
      id="missing-perspectives-section"
      aria-labelledby="missing-perspectives-heading"
      className={cn(
        'bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md text-left space-y-6',
        className
      )}
    >
      {/* Header */}
      <div className="space-y-2 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
          <Sparkles className="w-4 h-4" aria-hidden="true" />
          <span>Educational Horizon Expansion</span>
        </div>

        <h2
          id="missing-perspectives-heading"
          className="text-xl sm:text-2xl font-extrabold tracking-tight text-white"
        >
          WHAT MIGHT YOU BE MISSING?
        </h2>

        <p className="text-sm text-slate-300 font-normal leading-relaxed max-w-2xl">
          Some perspectives appeared much less frequently than others in this simulated environment.
          In algorithmic feeds, low visibility often means important research dimensions or community
          stakeholder concerns remain unencountered.
        </p>
      </div>

      {/* Underrepresented Perspective Cards */}
      {underrepresentedPerspectives.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {underrepresentedPerspectives.map((item) => (
            <Link
              key={item.perspective}
              to={ROUTES.PERSPECTIVES || '/perspectives'}
              state={{
                simulationData,
                analysisData,
                initialPerspectiveName: item.perspective,
              }}
              className="p-4 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700 hover:border-blue-500/60 transition-all duration-150 space-y-2.5 flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
                    Low Feed Share
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-700 text-[11px] font-mono text-slate-200">
                    {item.percentage}% ({item.count} {item.count === 1 ? 'item' : 'items'})
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                  {item.perspective}
                </h3>

                <p className="text-xs text-slate-300 font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-2 text-[11px] font-mono text-slate-400 group-hover:text-blue-400 border-t border-slate-700/60 flex items-center justify-between transition-colors">
                <div className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400" />
                  <span>Click to explore perspective</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-slate-300">
          All identified perspectives were relatively balanced in this simulation.
        </div>
      )}

      {/* Primary Action Callout */}
      <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-400 max-w-md text-left">
          Step into Phase 7 to compare alternative viewpoints side by side, read balanced syntheses,
          and discover underrepresented evidence.
        </div>

        <Link
          to={ROUTES.PERSPECTIVES || '/perspectives'}
          state={{ simulationData, analysisData }}
          id="explore-perspectives-cta-btn"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-sm hover:shadow-md cursor-pointer shrink-0"
        >
          <span>Explore These Perspectives</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
