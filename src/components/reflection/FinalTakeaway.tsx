import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, RotateCcw, Home } from 'lucide-react';
import { ExpandingBubbleVisual } from './ExpandingBubbleVisual.js';
import { HabitCard } from './HabitCard.js';
import { JourneySummary } from './JourneySummary.js';
import { CompletionSummary } from './CompletionSummary.js';
import { ROUTES } from '../../../shared/constants.js';
import { cn } from '../../lib/utils.js';
import type { SessionJourneySummary, ReflectionAnswers } from '../../../shared/types.js';

export interface FinalTakeawayProps {
  summary: SessionJourneySummary;
  answers: ReflectionAnswers;
  onRetakeReflection?: () => void;
  className?: string;
}

export function FinalTakeaway({
  summary,
  answers,
  onRetakeReflection,
  className,
}: FinalTakeawayProps): React.JSX.Element {
  return (
    <div
      id="reflection-final-takeaway-view"
      className={cn('max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300', className)}
    >
      {/* Header Banner */}
      <div className="text-center space-y-4 pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
          <span>Experience Complete</span>
        </div>

        <h1
          id="final-takeaway-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 uppercase font-mono"
        >
          YOUR PERSPECTIVE IS A STARTING POINT.
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          A diverse information environment doesn&apos;t mean agreeing with every viewpoint. It means
          having the opportunity to encounter, question and evaluate different ways of seeing an issue.
        </p>
      </div>

      {/* Completion Visual (Expanding Bubble) */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <ExpandingBubbleVisual perspectivesCount={summary.perspectivesEncountered} />
      </div>

      {/* Core Takeaway Habit Card (PAUSE. CHECK. EXPLORE.) */}
      <HabitCard />

      {/* User's Chosen Commitments (Session Echo) */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
            Your Personal Reflections
          </span>
          {onRetakeReflection && (
            <button
              type="button"
              onClick={onRetakeReflection}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 font-semibold cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" aria-hidden="true" />
              <span>Edit reflection</span>
            </button>
          )}
        </div>

        <div className="space-y-3 pt-1 text-xs sm:text-sm">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
            <span className="text-slate-500 text-[11px] font-mono uppercase block">
              When encountering a strong claim:
            </span>
            <p className="font-semibold text-slate-900">{answers.question1}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
            <span className="text-slate-500 text-[11px] font-mono uppercase block">
              What surprised you most:
            </span>
            <p className="font-semibold text-slate-900">{answers.question2}</p>
          </div>

          {answers.question3 && answers.question3.trim().length > 0 && (
            <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/70 space-y-1">
              <span className="text-blue-700 text-[11px] font-mono uppercase block font-bold">
                Habit you want to carry forward:
              </span>
              <p className="font-semibold text-blue-950 italic">&ldquo;{answers.question3}&rdquo;</p>
            </div>
          )}
        </div>
      </div>

      {/* 4-Step Learning Journey Summary */}
      <JourneySummary />

      {/* Session Metrics Summary */}
      <CompletionSummary summary={summary} />

      {/* Final Action Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <Link
          to={ROUTES.HOME || '/'}
          id="reflection-return-home-btn"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
        >
          <Home className="w-4 h-4" aria-hidden="true" />
          <span>Return Home</span>
        </Link>

        <Link
          to={ROUTES.EXPLORE || '/explore'}
          id="reflection-explore-another-btn"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white font-bold text-sm sm:text-base transition-all shadow-sm hover:shadow-md cursor-pointer"
        >
          <span>Explore Another Topic</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
