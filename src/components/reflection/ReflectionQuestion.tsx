import React from 'react';
import { HelpCircle } from 'lucide-react';
import { ReflectionOption } from './ReflectionOption.js';
import { cn } from '../../lib/utils.js';
import type { ReflectionQuestionOption } from '../../../shared/types.js';

export interface ReflectionQuestionProps {
  questionNumber: number;
  questionText: string;
  options: ReflectionQuestionOption[];
  selectedValue: string;
  onSelectOption: (value: string) => void;
  name: string;
  required?: boolean;
  className?: string;
}

export function ReflectionQuestion({
  questionNumber,
  questionText,
  options,
  selectedValue,
  onSelectOption,
  name,
  required = true,
  className,
}: ReflectionQuestionProps): React.JSX.Element {
  const groupId = `reflection-question-${questionNumber}`;

  return (
    <fieldset
      id={groupId}
      aria-labelledby={`${groupId}-legend`}
      className={cn(
        'bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs space-y-4 transition-all',
        className
      )}
    >
      {/* Header Tag */}
      <div className="flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200/60">
          <HelpCircle className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
          <span>QUESTION {questionNumber}</span>
        </div>

        {required && (
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            Required
          </span>
        )}
      </div>

      {/* Legend / Question Statement */}
      <legend
        id={`${groupId}-legend`}
        className="text-base sm:text-lg font-bold text-slate-900 leading-snug pt-1"
      >
        {questionText}
      </legend>

      {/* Radio Options List */}
      <div role="radiogroup" aria-labelledby={`${groupId}-legend`} className="space-y-2.5 pt-1">
        {options.map((option) => (
          <ReflectionOption
            key={option.id}
            id={`${name}-option-${option.id}`}
            name={name}
            value={option.label}
            label={option.label}
            selected={selectedValue === option.label}
            onSelect={onSelectOption}
          />
        ))}
      </div>
    </fieldset>
  );
}
