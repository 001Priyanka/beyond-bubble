import React from 'react';
import { PenLine } from 'lucide-react';
import { cn } from '../../lib/utils.js';

export interface ReflectionTextInputProps {
  questionNumber: number;
  questionText: string;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  placeholder?: string;
  className?: string;
}

export function ReflectionTextInput({
  questionNumber,
  questionText,
  value,
  onChange,
  maxLength = 300,
  placeholder = "Example: I'll check the source before sharing.",
  className,
}: ReflectionTextInputProps): React.JSX.Element {
  const inputId = `reflection-text-input-q${questionNumber}`;
  const charCount = value.length;
  const isNearLimit = charCount >= maxLength - 20;

  return (
    <div
      id={`reflection-field-q${questionNumber}`}
      className={cn(
        'bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs space-y-4 transition-all',
        className
      )}
    >
      {/* Header Tag */}
      <div className="flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200/60">
          <PenLine className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
          <span>QUESTION {questionNumber}</span>
        </div>

        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
          Optional
        </span>
      </div>

      {/* Label Statement */}
      <label
        htmlFor={inputId}
        className="text-base sm:text-lg font-bold text-slate-900 leading-snug block pt-1"
      >
        {questionText}
      </label>

      {/* Textarea Input */}
      <div className="space-y-2 pt-1">
        <textarea
          id={inputId}
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
          maxLength={maxLength}
          rows={3}
          placeholder={placeholder}
          aria-describedby={`${inputId}-counter ${inputId}-hint`}
          className="w-full p-4 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 text-sm sm:text-base leading-relaxed transition-all focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y min-h-[90px]"
        />

        {/* Counter and hint */}
        <div className="flex items-center justify-between gap-2 text-xs">
          <span id={`${inputId}-hint`} className="text-slate-400 font-mono text-[11px]">
            Private to your session
          </span>

          <span
            id={`${inputId}-counter`}
            className={cn(
              'font-mono text-[11px]',
              isNearLimit ? 'text-amber-600 font-bold' : 'text-slate-400'
            )}
            aria-live="polite"
          >
            {charCount} / {maxLength}
          </span>
        </div>
      </div>
    </div>
  );
}
