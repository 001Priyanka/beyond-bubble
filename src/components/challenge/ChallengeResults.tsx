import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Circle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  BookOpen,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';
import { ROUTES } from '../../../shared/constants.js';
import { cn } from '../../lib/utils.js';
import type { ChallengeSubmissionResponse } from '../../../shared/types.js';

export interface ChallengeResultsProps {
  result: ChallengeSubmissionResponse;
  onReview: () => void;
  onRetake: () => void;
  topicId?: string;
  simulationData?: any;
  analysisData?: any;
  topic?: any;
  exploredPerspectives?: any[];
  className?: string;
}

export function ChallengeResults({
  result,
  onReview,
  onRetake,
  topicId,
  simulationData,
  analysisData,
  topic,
  exploredPerspectives,
  className,
}: ChallengeResultsProps): React.JSX.Element {
  return (
    <div
      id="challenge-results-view"
      className={cn('max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300', className)}
    >
      {/* Header Banner */}
      <div className="text-center space-y-4 pt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
          <span>Challenge Completed</span>
        </div>

        <h1
          id="challenge-results-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 uppercase font-mono"
        >
          YOU&apos;RE LEARNING TO LOOK TWICE.
        </h1>

        <p className="text-base text-slate-600 max-w-xl mx-auto font-normal leading-relaxed">
          Critical thinking is a muscle built through practice. Here is how your signal evaluation
          shaped up across the four dimensions.
        </p>
      </div>

      {/* Main Score & Concepts Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
        {/* Score Overview */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-5">
            <div className="flex flex-col items-center justify-center w-20 h-20 rounded-2xl bg-slate-900 text-white font-mono shadow-inner">
              <span className="text-3xl font-black">{result.correctAnswersCount}</span>
              <span className="text-xs text-slate-400 font-medium">of {result.totalQuestions}</span>
            </div>

            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold">
                Evaluation Score
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{result.ratingLabel}</h2>
              <p className="text-xs text-slate-500 font-normal">
                {result.score}% signal detection accuracy
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onRetake}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Retake challenge</span>
          </button>
        </div>

        {/* Concept Breakdown Checklist */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
            Concept Mastery Breakdown
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {result.conceptResults.map((item) => (
              <div
                key={item.conceptId}
                className={cn(
                  'p-4 rounded-xl border flex items-start gap-3 transition-colors',
                  item.identified
                    ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                    : 'bg-slate-50 border-slate-200/80 text-slate-700'
                )}
              >
                {item.identified ? (
                  <CheckCircle2
                    className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                ) : (
                  <Circle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
                )}

                <div className="space-y-0.5">
                  <span className="text-sm font-bold block">{item.conceptTitle}</span>
                  <span className="text-xs text-slate-500 font-normal">
                    {item.identified
                      ? 'Concept recognized accurately'
                      : 'Recommended for future review'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actionable Takeaway Habit Callout */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-50/90 to-indigo-50/70 border border-blue-200/70 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wider">
            <Lightbulb className="w-4 h-4 text-blue-600" aria-hidden="true" />
            <span>{result.takeawayHabit.heading}</span>
          </div>

          <div className="space-y-1 pl-6">
            <p className="text-sm font-medium text-slate-700">{result.takeawayHabit.habit}</p>
            <p className="text-base sm:text-lg font-bold text-blue-950 italic">
              &ldquo;{result.takeawayHabit.prompt}&rdquo;
            </p>
          </div>
        </div>

        {/* Action Navigation Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <button
            type="button"
            id="review-challenge-btn"
            onClick={onReview}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4" aria-hidden="true" />
            <span>Review All 4 Questions</span>
          </button>

          <Link
            to={ROUTES.REFLECTION || '/reflection'}
            state={{
              challengeResult: result,
              topicId,
              simulationData,
              analysisData,
              topic,
              exploredPerspectives,
            }}
            id="continue-to-reflection-btn"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white font-bold text-sm sm:text-base transition-all shadow-sm hover:shadow-md cursor-pointer"
          >
            <span>Continue to Reflection</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
