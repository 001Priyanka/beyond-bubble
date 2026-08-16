import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { cn } from '../../lib/utils.js';
import type { ChallengeQuestion } from '../../../shared/types.js';

export interface ChallengeProgressProps {
  currentIndex: number;
  totalQuestions: number;
  questions: ChallengeQuestion[];
  userAnswers: Record<string, string>;
  className?: string;
}

export function ChallengeProgress({
  currentIndex,
  totalQuestions,
  questions,
  userAnswers,
  className,
}: ChallengeProgressProps): React.JSX.Element {
  const currentNum = currentIndex + 1;
  const progressPercent = Math.round((currentNum / totalQuestions) * 100);

  return (
    <div
      id="challenge-progress-container"
      className={cn('space-y-3', className)}
      role="region"
      aria-label="Challenge progress"
    >
      {/* Top Progress Info */}
      <div className="flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
            Question {currentNum} of {totalQuestions}
          </span>
          <span className="text-slate-500 hidden sm:inline">
            • {questions[currentIndex]?.conceptTitle}
          </span>
        </div>

        <div className="font-mono text-slate-500 text-[11px]">
          <span className="sr-only">Completion progress: </span>
          {progressPercent}% Complete
        </div>
      </div>

      {/* Accessible Progress Bar */}
      <div
        className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60"
        role="progressbar"
        aria-valuenow={currentNum}
        aria-valuemin={1}
        aria-valuemax={totalQuestions}
        aria-label={`Question ${currentNum} of ${totalQuestions}: ${questions[currentIndex]?.conceptTitle || ''}`}
      >
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${(currentNum / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Step Indicators */}
      <div className="grid grid-cols-4 gap-2 pt-1" aria-hidden="true">
        {questions.map((q, idx) => {
          const isAnswered = Boolean(userAnswers[q.id]);
          const isCurrent = idx === currentIndex;

          return (
            <div
              key={q.id}
              className={cn(
                'flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium transition-colors border',
                isCurrent
                  ? 'bg-blue-50/80 border-blue-200 text-blue-900 font-semibold'
                  : isAnswered
                    ? 'bg-emerald-50/60 border-emerald-200 text-emerald-800'
                    : 'bg-slate-50/50 border-slate-200/60 text-slate-400'
              )}
            >
              {isAnswered ? (
                <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
              ) : isCurrent ? (
                <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 animate-pulse" />
              ) : (
                <Circle className="w-3 h-3 text-slate-300 shrink-0" />
              )}
              <span className="truncate hidden sm:inline">{q.conceptTitle}</span>
              <span className="sm:hidden font-mono">Q{idx + 1}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
