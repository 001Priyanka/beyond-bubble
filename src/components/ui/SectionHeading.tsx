import React from 'react';
import { cn } from '../../lib/utils.js';

export interface SectionHeadingProps {
  kicker?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeading({
  kicker,
  title,
  description,
  align = 'left',
  action,
  className,
  ...props
}: SectionHeadingProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'space-y-1 mb-6 text-left',
        align === 'center' && 'text-center max-w-2xl mx-auto',
        action && 'flex flex-col sm:flex-row sm:items-end justify-between gap-4',
        className
      )}
      {...props}
    >
      <div>
        {kicker && (
          <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent-blue)] mb-1">
            {kicker}
          </div>
        )}
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight">
          {title}
        </h2>
        {description && (
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1 max-w-2xl">
            {description}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
