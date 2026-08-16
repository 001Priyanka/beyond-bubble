import React from 'react';
import { Compass, Eye, ShieldCheck, PieChart } from 'lucide-react';
import { cn } from '../../lib/utils.js';
import type { SessionJourneySummary } from '../../../shared/types.js';

export interface CompletionSummaryProps {
  summary: SessionJourneySummary;
  className?: string;
}

export function CompletionSummary({
  summary,
  className,
}: CompletionSummaryProps): React.JSX.Element {
  return (
    <div
      id="session-metrics-summary"
      className={cn(
        'bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs space-y-4',
        className
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
          Session Summary
        </span>
        <span className="text-xs font-mono text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full font-semibold">
          Topic: {summary.topicName}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-1">
        {/* Metric 1: Topic Explored */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono">
            <Compass className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
            <span>Topic</span>
          </div>
          <p className="text-sm sm:text-base font-bold text-slate-900 truncate">
            {summary.topicName}
          </p>
        </div>

        {/* Metric 2: Perspectives Encountered */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono">
            <Eye className="w-3.5 h-3.5 text-indigo-600" aria-hidden="true" />
            <span>Encountered</span>
          </div>
          <p className="text-sm sm:text-base font-bold text-slate-900">
            {summary.perspectivesEncountered}{' '}
            <span className="text-xs text-slate-500 font-normal">perspectives</span>
          </p>
        </div>

        {/* Metric 3: Perspectives Explored */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono">
            <PieChart className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
            <span>Explored</span>
          </div>
          <p className="text-sm sm:text-base font-bold text-slate-900">
            {summary.perspectivesExplored}{' '}
            <span className="text-xs text-slate-500 font-normal">in depth</span>
          </p>
        </div>

        {/* Metric 4: Media Literacy Challenge */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
            <span>Challenge</span>
          </div>
          <p className="text-sm sm:text-base font-bold text-slate-900">
            {summary.challengeCorrectCount} / {summary.challengeTotalCount}{' '}
            <span className="text-xs text-slate-500 font-normal">evaluations</span>
          </p>
        </div>
      </div>

      <p className="text-[11px] text-slate-400 font-mono pt-1 text-center sm:text-left">
        * Environment diversity metrics describe the simulated feed curation, not personal traits.
      </p>
    </div>
  );
}
