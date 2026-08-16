import React from 'react';
import {
  ShieldAlert,
  Info,
  CheckCircle2,
  AlertTriangle,
  Compass,
  Layers,
} from 'lucide-react';
import { cn } from '../../lib/utils.js';
import type { InterpretationDetails, DiversityInterpretationLabel } from '../../../shared/types.js';

export interface ScoreOverviewProps {
  score: number; // 0 to 100
  interpretation: InterpretationDetails;
  topicTitle?: string;
  className?: string;
}

const INTERPRETATION_THEMES: Record<
  DiversityInterpretationLabel,
  {
    bg: string;
    text: string;
    border: string;
    meterColor: string;
    icon: React.ElementType;
  }
> = {
  'Highly concentrated': {
    bg: 'bg-amber-50',
    text: 'text-amber-900',
    border: 'border-amber-200',
    meterColor: 'bg-amber-500',
    icon: ShieldAlert,
  },
  'Moderately concentrated': {
    bg: 'bg-blue-50',
    text: 'text-blue-900',
    border: 'border-blue-200',
    meterColor: 'bg-blue-600',
    icon: Info,
  },
  'Relatively diverse': {
    bg: 'bg-emerald-50',
    text: 'text-emerald-900',
    border: 'border-emerald-200',
    meterColor: 'bg-emerald-600',
    icon: CheckCircle2,
  },
  'Highly diverse': {
    bg: 'bg-teal-50',
    text: 'text-teal-900',
    border: 'border-teal-200',
    meterColor: 'bg-teal-600',
    icon: CheckCircle2,
  },
};

export function ScoreOverview({
  score,
  interpretation,
  topicTitle,
  className,
}: ScoreOverviewProps) {
  const theme =
    INTERPRETATION_THEMES[interpretation.label] ||
    INTERPRETATION_THEMES['Moderately concentrated'];
  const StatusIcon = theme.icon;

  const boundedScore = Math.max(0, Math.min(100, Math.round(score)));

  return (
    <section
      id="score-overview-section"
      aria-labelledby="perspective-diversity-score-heading"
      className={cn(
        'bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs text-left space-y-6',
        className
      )}
    >
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200/60">
            <Layers className="w-4 h-4" aria-hidden="true" />
          </div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
            Stage 2 • Core Analytical Metric
          </span>
        </div>

        {/* Interpretation Badge */}
        <div
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border',
            theme.bg,
            theme.text,
            theme.border
          )}
        >
          <StatusIcon className="w-4 h-4" aria-hidden="true" />
          <span>{interpretation.label}</span>
        </div>
      </div>

      {/* Main Score Hero Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Large Score Readout */}
        <div className="md:col-span-5 space-y-2">
          <h2
            id="perspective-diversity-score-heading"
            className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400"
          >
            PERSPECTIVE DIVERSITY
          </h2>

          <div className="flex items-baseline gap-2">
            <span
              id="main-diversity-score-value"
              className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight"
            >
              {boundedScore}
            </span>
            <span className="text-xl sm:text-2xl font-bold text-slate-400">/ 100</span>
          </div>

          <div className="text-sm font-semibold text-slate-700">
            Classification:{' '}
            <strong className={cn('font-bold', theme.text)}>{interpretation.label}</strong>{' '}
            <span className="text-xs text-slate-400 font-mono">({interpretation.range})</span>
          </div>
        </div>

        {/* Meter & Interpretation Description */}
        <div className="md:col-span-7 space-y-4">
          {/* Visual Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-mono text-slate-500">
              <span>0 (Concentrated)</span>
              <span>50 (Moderate)</span>
              <span>100 (Diverse)</span>
            </div>
            <div
              className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200"
              role="progressbar"
              aria-valuenow={boundedScore}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Perspective Diversity Score: ${boundedScore} out of 100`}
            >
              <div
                className={cn('h-full rounded-full transition-all duration-500', theme.meterColor)}
                style={{ width: `${boundedScore}%` }}
              />
            </div>
          </div>

          {/* Neutral Educational Explanation */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700 leading-relaxed font-normal">
            <p className="font-medium text-slate-800">{interpretation.summary}</p>
          </div>
        </div>
      </div>

      {/* Mandatory Non-Diagnostic Privacy & Objective Notice */}
      <div className="pt-4 border-t border-slate-100 flex items-start gap-2.5 text-xs text-slate-500">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
        <p className="leading-relaxed font-normal">
          This score describes the distribution of perspectives, sources and content framing in
          this simulated environment. It does not measure your personal beliefs or bias.
        </p>
      </div>
    </section>
  );
}
