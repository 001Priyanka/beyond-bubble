import React from 'react';
import { ArrowLeft, Compass, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../shared/constants.js';
import { cn } from '../../lib/utils.js';
import type { Topic } from '../../../shared/types.js';

export interface AnalysisHeroProps {
  topic: Topic | null;
  itemCount: number;
  className?: string;
}

export function AnalysisHero({ topic, itemCount, className }: AnalysisHeroProps) {
  return (
    <header className={cn('space-y-4 text-left border-b border-slate-200/80 pb-6', className)}>
      {/* Top Navigation & Status */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          to={ROUTES.FEED}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors py-1 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Back to Simulated Feed</span>
        </Link>

        {/* Clear Educational Badge */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-mono font-bold tracking-wider text-slate-700 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
          <span>SIMULATED • EDUCATIONAL</span>
        </div>
      </div>

      {/* Main Title & Subtitle */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight uppercase">
          YOUR INFORMATION ENVIRONMENT
        </h1>
        <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-3xl">
          Here's what the simulated feed you just explored looked like.
        </p>
      </div>

      {/* Badges / Topic attribution */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {topic && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 border border-blue-200/80 text-xs font-bold text-blue-900">
            <Compass className="w-3.5 h-3.5 text-blue-700" aria-hidden="true" />
            <span>Topic: {topic.name}</span>
          </div>
        )}

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700">
          <span>{itemCount} simulated content items analyzed</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200/70 text-xs font-medium text-emerald-800 ml-auto">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Objective Statistical Analysis</span>
        </div>
      </div>
    </header>
  );
}
