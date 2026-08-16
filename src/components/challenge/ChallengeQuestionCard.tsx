import React from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, HelpCircle, Loader2 } from 'lucide-react';
import { SupportingMaterialView } from './SupportingMaterialView.js';
import { cn } from '../../lib/utils.js';
import type { ChallengeQuestion } from '../../../shared/types.js';

export interface ChallengeQuestionCardProps {
  question: ChallengeQuestion;
  selectedOptionId: string | null;
  isLocked: boolean;
  onSelectOption: (optionId: string) => void;
  onNext: () => void;
  isLastQuestion: boolean;
  isSubmitting?: boolean;
  className?: string;
}

export function ChallengeQuestionCard({
  question,
  selectedOptionId,
  isLocked,
  onSelectOption,
  onNext,
  isLastQuestion,
  isSubmitting = false,
  className,
}: ChallengeQuestionCardProps): React.JSX.Element {
  const isAnswered = Boolean(selectedOptionId);
  const isCorrect = isAnswered && selectedOptionId?.toLowerCase() === question.correctAnswer.toLowerCase();

  return (
    <div
      id={`challenge-card-${question.id}`}
      className={cn(
        'bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-200',
        className
      )}
    >
      {/* Concept Badge Header */}
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200/60">
          <HelpCircle className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
          <span>{question.conceptTitle}</span>
        </span>

        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
          {question.conceptBadge}
        </span>
      </div>

      {/* Supporting Material */}
      <SupportingMaterialView material={question.supportingMaterial} />

      {/* Question Prompt */}
      <div className="space-y-1.5 pt-2">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
          {question.question}
        </h2>
      </div>

      {/* Answer Options Radio Card Group */}
      <div
        role="radiogroup"
        aria-label={question.question}
        className="space-y-3"
      >
        {question.options.map((option) => {
          const isSelected = selectedOptionId?.toLowerCase() === option.id.toLowerCase();
          const isCorrectOption = option.id.toLowerCase() === question.correctAnswer.toLowerCase();

          let optionStyle =
            'bg-slate-50/60 hover:bg-slate-100/80 border-slate-200/80 text-slate-800 hover:border-slate-300';
          let indicatorStyle = 'bg-white border-slate-300 text-slate-700';

          if (isAnswered) {
            if (isSelected) {
              if (isCorrect) {
                optionStyle = 'bg-emerald-50/90 border-emerald-300 text-emerald-950 ring-1 ring-emerald-300';
                indicatorStyle = 'bg-emerald-600 border-emerald-600 text-white font-bold';
              } else {
                optionStyle = 'bg-amber-50/90 border-amber-300 text-amber-950 ring-1 ring-amber-300';
                indicatorStyle = 'bg-amber-600 border-amber-600 text-white font-bold';
              }
            } else if (isCorrectOption) {
              // Highlight correct answer gently if user picked wrong
              optionStyle = 'bg-emerald-50/40 border-emerald-200/80 text-emerald-900 opacity-90';
              indicatorStyle = 'bg-emerald-100 border-emerald-300 text-emerald-800';
            } else {
              optionStyle = 'bg-slate-50/30 border-slate-200/40 text-slate-400 opacity-60';
              indicatorStyle = 'bg-slate-100 border-slate-200 text-slate-400';
            }
          }

          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={isLocked}
              onClick={() => onSelectOption(option.id)}
              className={cn(
                'w-full p-4 rounded-xl border text-left transition-all duration-150 flex items-start gap-3.5 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                isLocked ? 'cursor-default' : 'cursor-pointer',
                optionStyle
              )}
            >
              {/* Option Letter Badge */}
              <span
                className={cn(
                  'flex items-center justify-center w-6 h-6 rounded-lg text-xs font-mono border shrink-0 mt-0.5 transition-colors',
                  indicatorStyle
                )}
              >
                {option.label}
              </span>

              {/* Option Text */}
              <span className="text-sm sm:text-base font-normal leading-relaxed flex-1">
                {option.text}
              </span>
            </button>
          );
        })}
      </div>

      {/* Immediate Educational Feedback Banner */}
      {isAnswered && (
        <div
          id="challenge-feedback-panel"
          className={cn(
            'p-5 rounded-xl border animate-in fade-in slide-in-from-top-2 duration-200 space-y-2.5',
            isCorrect
              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
              : 'bg-amber-50/80 border-amber-200 text-amber-950'
          )}
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-2 font-bold text-sm">
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" aria-hidden="true" />
                <span>Your answer: Correct</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" aria-hidden="true" />
                <span>Your answer: Needs another look</span>
              </>
            )}
          </div>

          <div className="text-xs sm:text-sm leading-relaxed space-y-1">
            <p className="font-semibold text-slate-900">
              {isCorrect ? "Good observation. Here's why:" : "Not quite — here's what to look for:"}
            </p>
            <p className="text-slate-700 font-normal">{question.explanation}</p>
          </div>
        </div>
      )}

      {/* Action Footer Button */}
      {isAnswered && (
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            id="challenge-next-btn"
            onClick={onNext}
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white font-bold text-sm transition-all shadow-sm hover:shadow-md cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                <span>Submitting results...</span>
              </>
            ) : isLastQuestion ? (
              <>
                <span>See Final Results</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </>
            ) : (
              <>
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
