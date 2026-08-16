import React from 'react';
import { Info, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';
import { cn } from '../../lib/utils.js';
import { Progress } from './Progress.js';

export interface ScoreBreakdown {
  viewpointDiversity: number; // 0 to 100 (50% weight)
  sourceDiversity: number;    // 0 to 100 (30% weight)
  contentDiversity: number;   // 0 to 100 (20% weight)
}

export interface DiversityScoreProps {
  score: number; // 0 to 100
  topicTitle?: string;
  breakdown?: ScoreBreakdown;
  showBreakdown?: boolean;
  size?: 'compact' | 'standard' | 'hero';
  className?: string;
}

export function DiversityScore({
  score,
  topicTitle,
  breakdown = { viewpointDiversity: score, sourceDiversity: score, contentDiversity: score },
  showBreakdown = true,
  size = 'standard',
  className,
  ...props
}: DiversityScoreProps & React.HTMLAttributes<HTMLDivElement>) {
  // Determine tone & pedagogical classification
  let level: 'low' | 'moderate' | 'balanced';
  let levelLabel: string;
  let levelDescription: string;
  let themeColor: string;
  let themeBg: string;
  let icon = AlertTriangle;

  if (score < 45) {
    level = 'low';
    levelLabel = 'Concentrated Exposure';
    levelDescription =
      'Your simulated feed concentrated predominantly on a single perspective angle. Multiple alternative viewpoints and stakeholders were not represented.';
    themeColor = '#D97706'; // warm amber (educational caution, not harsh alarm)
    themeBg = '#FFFBEB';
    icon = ShieldAlert;
  } else if (score < 75) {
    level = 'moderate';
    levelLabel = 'Moderate Viewpoint Variety';
    levelDescription =
      'Your simulated feed exposed you to two or three viewpoints, but key academic or community stakeholder dimensions remain undiscovered.';
    themeColor = '#1D63ED'; // editorial blue
    themeBg = '#EFF6FF';
    icon = Info;
  } else {
    level = 'balanced';
    levelLabel = 'Broad Perspective Landscape';
    levelDescription =
      'Your exposure spans diverse viewpoints, diverse source institutions, and varied analytical formats across this topic.';
    themeColor = '#0D9488'; // teal / positive
    themeBg = '#F0FDFA';
    icon = CheckCircle2;
  }

  const IconComponent = icon;

  return (
    <section
      aria-label="Perspective Diversity Score Result"
      className={cn(
        'bg-white border border-slate-200 rounded-xl p-6 shadow-xs text-left',
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Explainable Exposure Metric
          </span>
          <h3 className="text-lg font-bold text-slate-900 leading-snug">
            Perspective Diversity Score
          </h3>
          {topicTitle && (
            <p className="text-xs text-slate-500 mt-0.5">
              Evaluated Topic: <span className="font-medium text-slate-700">{topicTitle}</span>
            </p>
          )}
        </div>

        <div
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
          style={{ backgroundColor: themeBg, color: themeColor }}
        >
          <IconComponent className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{levelLabel}</span>
        </div>
      </div>

      {/* Main Score Readout */}
      <div className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-black text-slate-900 tracking-tight font-mono">
            {Math.round(score)}
          </span>
          <span className="text-lg font-bold text-slate-400 font-mono">/ 100</span>
        </div>

        <div className="max-w-md">
          <p className="text-xs text-slate-600 leading-relaxed">
            {levelDescription}
          </p>
        </div>
      </div>

      {/* Overall Score Linear Track */}
      <div className="space-y-1 mb-6">
        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${Math.max(5, Math.min(100, score))}%`,
              backgroundColor: themeColor,
            }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-slate-400 font-mono px-0.5">
          <span>0 (Concentrated)</span>
          <span>50 (Moderate)</span>
          <span>100 (Balanced)</span>
        </div>
      </div>

      {/* 50 / 30 / 20 Methodology Breakdown */}
      {showBreakdown && (
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-800">
              Metric Mathematical Weighting
            </span>
            <span className="text-[11px] text-slate-400 font-mono">Deterministic formula</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* 50% Viewpoint Diversity */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-semibold text-slate-700">Viewpoint Diversity</span>
                <span className="font-mono text-slate-500 font-bold">{Math.round(breakdown.viewpointDiversity)}%</span>
              </div>
              <div className="text-[11px] text-slate-500 mb-2">50% formula weight</div>
              <Progress value={breakdown.viewpointDiversity} size="sm" variant="accent" />
            </div>

            {/* 30% Source Diversity */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-semibold text-slate-700">Source Diversity</span>
                <span className="font-mono text-slate-500 font-bold">{Math.round(breakdown.sourceDiversity)}%</span>
              </div>
              <div className="text-[11px] text-slate-500 mb-2">30% formula weight</div>
              <Progress value={breakdown.sourceDiversity} size="sm" variant="default" />
            </div>

            {/* 20% Content Format Diversity */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-semibold text-slate-700">Format Diversity</span>
                <span className="font-mono text-slate-500 font-bold">{Math.round(breakdown.contentDiversity)}%</span>
              </div>
              <div className="text-[11px] text-slate-500 mb-2">20% formula weight</div>
              <Progress value={breakdown.contentDiversity} size="sm" variant="success" />
            </div>
          </div>

          {/* Educational Disclaimer */}
          <div className="text-[11px] text-slate-400 italic pt-1">
            * This score models your exposure within this simulated learning exercise. It is not a diagnostic test of personal beliefs or psychological traits.
          </div>
        </div>
      )}
    </section>
  );
}
