import React from 'react';
import { Eye, ShieldAlert, Sparkles, BookOpen, Compass } from 'lucide-react';
import { ExpandingMetaphorVisual } from './ExpandingMetaphorVisual.js';
import { cn } from '../../lib/utils.js';
import type { Topic } from '../../../shared/types.js';

export interface PerspectiveHeroProps {
  topic: Topic | null;
  perspectiveCount?: number;
  exploredCount?: number;
  className?: string;
}

export function PerspectiveHero({
  topic,
  perspectiveCount = 4,
  exploredCount = 1,
  className,
}: PerspectiveHeroProps) {
  return (
    <header
      id="perspective-hero-header"
      className={cn(
        'bg-slate-900 text-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-md border border-slate-800 relative overflow-hidden text-left',
        className
      )}
    >
      {/* Background Accent Gradients */}
      <div
        className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/3 w-64 h-64 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-4 max-w-2xl">
          {/* Transparency & Educational Category Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              id="simulated-educational-badge"
              className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-wider uppercase bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2.5 py-1 rounded-full"
            >
              <Sparkles className="w-3 h-3" aria-hidden="true" />
              SIMULATED • EDUCATIONAL
            </span>

            {topic && (
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-300 bg-slate-800/90 border border-slate-700 px-2.5 py-1 rounded-full">
                Topic: <strong className="text-white font-semibold">{topic.name}</strong>
              </span>
            )}
          </div>

          {/* Main Phase 7 Heading */}
          <h1
            id="perspective-hero-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight font-serif"
          >
            STEP OUTSIDE THE BUBBLE.
          </h1>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            You've seen which perspectives dominated your simulated environment.
            Now explore some that appeared less frequently.
          </p>

          {/* Mandatory Ethical & Critical Thinking Principle Callout */}
          <div
            id="ethical-principle-banner"
            className="p-3 sm:p-3.5 rounded-xl bg-slate-800/80 border border-blue-400/40 text-blue-100 flex items-start gap-2.5 shadow-2xs"
          >
            <Compass className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="text-xs sm:text-sm font-medium leading-normal text-slate-200">
              <strong className="text-white font-bold">
                "Exploring a perspective doesn't mean agreeing with it."
              </strong>{' '}
              <span className="text-slate-300">
                The purpose of this explorer is perspective exposure and critical inquiry, not political persuasion.
              </span>
            </div>
          </div>
        </div>

        {/* Visual Metaphor: Expanding Horizon */}
        <div className="shrink-0 flex flex-col items-center md:items-end">
          <ExpandingMetaphorVisual
            perspectiveCount={perspectiveCount}
            exploredCount={exploredCount}
          />
        </div>
      </div>
    </header>
  );
}
