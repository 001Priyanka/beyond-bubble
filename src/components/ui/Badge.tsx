import React from 'react';
import { cn } from '../../lib/utils.js';

export interface BadgeProps {
  className?: string;
  variant?: 'default' | 'neutral' | 'info' | 'success' | 'warning' | 'destructive' | 'outline';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

export function Badge({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}: BadgeProps & React.HTMLAttributes<HTMLSpanElement>) {
  const baseStyles =
    'inline-flex items-center font-medium rounded-full whitespace-nowrap transition-colors select-none';

  const variants: Record<string, string> = {
    default: 'bg-[var(--secondary)] text-[var(--secondary-foreground)] border border-[var(--border)]',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200',
    info: 'bg-[var(--info-subtle)] text-[var(--info-foreground)] border border-sky-200',
    success: 'bg-[var(--success-subtle)] text-[var(--success-foreground)] border border-teal-200',
    warning: 'bg-[var(--warning-subtle)] text-[var(--warning-foreground)] border border-amber-200',
    destructive: 'bg-[var(--destructive-subtle)] text-[var(--destructive-foreground)] border border-rose-200',
    outline: 'bg-transparent text-[var(--foreground)] border border-[var(--border)]',
  };

  const sizes: Record<string, string> = {
    sm: 'text-[11px] px-2 py-0.5 gap-1 leading-normal',
    md: 'text-xs px-2.5 py-1 gap-1.5 leading-normal',
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
}
