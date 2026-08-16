import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  HelpCircle,
} from 'lucide-react';
import { SupportingMaterialView } from './SupportingMaterialView.js';
import { ROUTES } from '../../../shared/constants.js';
import { cn } from '../../lib/utils.js';
import type { ChallengeSubmissionResponse } from '../../../shared/types.js';

export interface ChallengeReviewViewProps {
  result: ChallengeSubmissionResponse;
  onBackToResults: () => void;
  topicId?: string;
  simulationData?: any;
  analysisData?: any;
  topic?: any;
  exploredPerspectives?: any[];
  className?: string;
}

export function ChallengeReviewView({
  result,
  onBackToResults,
  topicId,
  simulationData,
  analysisData,
  topic,
  exploredPerspectives,
  className,
}: ChallengeReviewViewProps): React.JSX.Element {
  return (
    <div
      id="challenge-review-view"
      className={cn('max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300', className)}
    >
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider">
            <BookOpen className="w-4 h-4" aria-hidden="true" />
            <span>Question-by-Question Review</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
            EVALUATION BREAKDOWN
          </h1>
        </div>

        <button
          type="button"
          onClick={onBackToResults}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Back to Summary</span>
        </button>
      </div>

      {/* Review Cards List */}
      <div className="space-y-6">
        {result.reviews.map((rev, index) => {
          return (
            <div
              key={rev.questionId}
              id={`review-item-${rev.questionId}`}
              className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md">
                    Question {index + 1}
                  </span>
                  <span className="text-xs font-semibold text-slate-600">{rev.conceptTitle}</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold">
                  {rev.isCorrect ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Correct</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px]">
                      <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Needs Look</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Supporting Material */}
              <SupportingMaterialView material={rev.supportingMaterial} />

              {/* Question Text */}
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {rev.question}
              </h3>

              {/* User Selection & Correct Answer Comparison */}
              <div className="space-y-2.5 pt-1">
                <div
                  className={cn(
                    'p-3.5 rounded-xl border text-xs sm:text-sm space-y-1',
                    rev.isCorrect
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                      : 'bg-amber-50/70 border-amber-200 text-amber-950'
                  )}
                >
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider block opacity-75">
                    Your Selection:
                  </span>
                  <p className="font-medium">{rev.selectedOptionText}</p>
                </div>

                {!rev.isCorrect && (
                  <div className="p-3.5 rounded-xl border bg-emerald-50/40 border-emerald-200 text-emerald-950 text-xs sm:text-sm space-y-1">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider block text-emerald-800">
                      Standard Evaluation:
                    </span>
                    <p className="font-medium">{rev.correctOptionText}</p>
                  </div>
                )}
              </div>

              {/* Educational Explanation */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-xs sm:text-sm text-slate-700 space-y-1">
                <span className="font-semibold text-slate-900 block">Why this matters:</span>
                <p className="leading-relaxed">{rev.explanation}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Review Footer Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={onBackToResults}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to Results</span>
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
          id="review-continue-to-reflection-btn"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-sm hover:shadow-md cursor-pointer"
        >
          <span>Continue to Reflection</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
