import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils.js';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  charLimit?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      id,
      label,
      helperText,
      errorMessage,
      charLimit,
      value,
      defaultValue,
      disabled,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const hasError = Boolean(errorMessage);
    const currentLength = typeof value === 'string' ? value.length : typeof defaultValue === 'string' ? defaultValue.length : 0;

    return (
      <div className="w-full space-y-1.5 text-left">
        <div className="flex justify-between items-center">
          {label && (
            <label htmlFor={textareaId} className="block text-xs font-semibold text-slate-800">
              {label}
            </label>
          )}
          {charLimit && (
            <span className="text-[11px] text-slate-400 font-mono">
              {currentLength}/{charLimit}
            </span>
          )}
        </div>
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined
          }
          className={cn(
            'w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg px-3.5 py-2.5 transition-colors placeholder:text-slate-400 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:border-[var(--ring)] disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed resize-y',
            hasError && 'border-rose-400 focus-visible:ring-rose-500',
            className
          )}
          {...props}
        />
        {hasError && (
          <p id={`${textareaId}-error`} className="text-xs font-medium text-rose-600 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{errorMessage}</span>
          </p>
        )}
        {!hasError && helperText && (
          <p id={`${textareaId}-helper`} className="text-xs text-slate-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
