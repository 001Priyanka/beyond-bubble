import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layers,
  Sparkles,
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle2,
  Compass,
} from 'lucide-react';
import { Button } from '../ui/Button.js';
import { ROUTES } from '../../../shared/constants.js';
import { cn } from '../../lib/utils.js';
import type { SimulationFeedResponse } from '../../../shared/types.js';

export interface SimulationSummaryProps {
  simulationData: SimulationFeedResponse;
  className?: string;
}

export function SimulationSummary({
  simulationData,
  className,
}: SimulationSummaryProps) {
  const navigate = useNavigate();
  const { topic, feed, simulationMetadata } = simulationData;

  const itemsEncountered = feed.length;
  const perspectivesRepresented = Object.keys(
    simulationMetadata.perspectiveDistribution || {}
  ).length;
  const sourcesRepresented = Object.keys(
    simulationMetadata.sourceDistribution || {}
  ).length;

  const handleProceedToAnalysis = () => {
    navigate(ROUTES.ANALYSIS, {
      state: { simulationData },
    });
  };

  return (
    <section
      aria-labelledby="simulation-summary-heading"
      className={cn(
        'bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 text-left',
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200/60">
            <Layers className="w-4 h-4" aria-hidden="true" />
          </div>
          <h2
            id="simulation-summary-heading"
            className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900"
          >
            Simulation Feed Overview
          </h2>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/70">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Stage 1 Completed</span>
        </div>
      </div>

      {/* 4-Stat Metric Blocks */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* 1. Topic */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
            Topic
          </span>
          <span className="text-sm sm:text-base font-bold text-slate-900 truncate block">
            {topic.name}
          </span>
        </div>

        {/* 2. Items Encountered */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
            Items Encountered
          </span>
          <span className="text-sm sm:text-base font-bold text-slate-900 block">
            {itemsEncountered}
          </span>
        </div>

        {/* 3. Perspectives Represented */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
            Perspectives
          </span>
          <span className="text-sm sm:text-base font-bold text-blue-700 block">
            {perspectivesRepresented}
          </span>
        </div>

        {/* 4. Sources Represented */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
            Sources
          </span>
          <span className="text-sm sm:text-base font-bold text-slate-900 block">
            {sourcesRepresented}
          </span>
        </div>
      </div>

      {/* Stage 2 Call to Action Box */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
        <div className="space-y-0.5 text-center sm:text-left">
          <div className="text-sm sm:text-base font-bold text-slate-900">
            Ready to understand this information environment?
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Explore how these items distribute perspectives, discover blind spots, and compare alternative viewpoints.
          </p>
        </div>

        <Button
          id="analyze-environment-button"
          type="button"
          variant="primary"
          size="lg"
          onClick={handleProceedToAnalysis}
          rightIcon={<ArrowRight className="w-4 h-4" aria-hidden="true" />}
          className="w-full sm:w-auto font-bold px-7 py-3 shadow-sm text-sm justify-center shrink-0"
        >
          Analyze This Environment →
        </Button>
      </div>
    </section>
  );
}
