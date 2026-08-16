import React from 'react';
import { cn } from '../../lib/utils.js';

export interface ProgressProps {
  value: number; // 0 to 100
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'segmented';
  segments?: { label: string; value: number; color: string }[];
  className?: string;
}

export function Progress({
  value,
  max = 100,
  label,
  showValue = false,
  size = 'md',
  variant = 'accent',
  segments,
  className,
  ...props
}: ProgressProps & React.HTMLAttributes<HTMLDivElement>) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const barColors: Record<string, string> = {
    default: 'bg-[var(--primary)]',
    accent: 'bg-[var(--accent-blue)]',
    success: 'bg-[var(--success)]',
    warning: 'bg-[var(--warning)]',
  };

  return (
    <div className={cn('w-full space-y-1.5 text-left', className)} {...props}>
      {(label || showValue) && (
        <div className="flex justify-between items-center text-xs">
          {label && <span className="font-semibold text-slate-700">{label}</span>}
          {showValue && (
            <span className="font-mono text-slate-500 font-medium">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      {variant === 'segmented' && segments && segments.length > 0 ? (
        <div
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label || 'Segmented Progress'}
          className={cn(
            'w-full overflow-hidden rounded-full bg-slate-200 flex gap-0.5',
            sizeClasses[size]
          )}
        >
          {segments.map((seg, idx) => (
            <div
              key={idx}
              className="h-full transition-all duration-300 first:rounded-l-full last:rounded-r-full"
              style={{
                width: `${seg.value}%`,
                backgroundColor: seg.color,
              }}
              title={`${seg.label}: ${seg.value}%`}
            />
          ))}
        </div>
      ) : (
        <div
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label || 'Progress'}
          className={cn('w-full overflow-hidden rounded-full bg-slate-200', sizeClasses[size])}
        >
          <div
            className={cn('h-full rounded-full transition-all duration-500 ease-out', barColors[variant] || barColors.accent)}
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
    </div>
  );
}
