import React from 'react';
import { PERSPECTIVE_CATEGORIES, PerspectiveCategory, PerspectiveMetadata } from '../../../shared/constants.js';
import { cn } from '../../lib/utils.js';

export interface PerspectiveTagProps {
  category: PerspectiveCategory;
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
  customLabel?: string;
  className?: string;
}

export function PerspectiveTag({
  category,
  size = 'md',
  showDot = true,
  customLabel,
  className,
  ...props
}: PerspectiveTagProps & React.HTMLAttributes<HTMLSpanElement>) {
  const meta: PerspectiveMetadata = PERSPECTIVE_CATEGORIES[category] || {
    id: category,
    label: category,
    description: '',
    colorVar: 'var(--foreground)',
    bgVar: 'var(--secondary)',
    borderVar: 'var(--border)',
  };

  const label = customLabel || meta.label;

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5 font-medium',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3 py-1.5 gap-2 font-medium',
  };

  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border transition-colors select-none tracking-tight',
        sizeClasses[size],
        className
      )}
      style={{
        backgroundColor: meta.bgVar,
        borderColor: meta.borderVar,
        color: meta.colorVar,
      }}
      title={meta.description}
      {...props}
    >
      {showDot && (
        <span
          className={cn('rounded-full shrink-0', dotSizes[size])}
          style={{ backgroundColor: meta.colorVar }}
          aria-hidden="true"
        />
      )}
      <span>{label}</span>
    </span>
  );
}
