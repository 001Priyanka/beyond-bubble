import React from 'react';
import { AlertCircle, CheckCircle2, Inbox, RefreshCw, ArrowRight } from 'lucide-react';
import { Button } from './Button.js';
import { cn } from '../../lib/utils.js';

/* 1. Loading Skeleton */
export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({
  variant = 'text',
  width,
  height,
  className,
  style,
  ...props
}: SkeletonProps & React.HTMLAttributes<HTMLDivElement>) {
  const baseStyles = 'bg-slate-200/80 animate-pulse rounded-md';

  const variants = {
    text: 'h-4 w-full',
    circular: 'rounded-full w-10 h-10',
    rectangular: 'h-24 w-full',
    card: 'h-40 w-full rounded-xl',
  };

  return (
    <div
      className={cn(baseStyles, variants[variant], className)}
      style={{ width, height, ...style }}
      aria-hidden="true"
      {...props}
    />
  );
}

/* 2. Empty State */
export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  className,
  ...props
}: EmptyStateProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'border border-dashed border-slate-300 rounded-xl p-8 sm:p-12 text-center bg-slate-50/50 flex flex-col items-center justify-center max-w-md mx-auto',
        className
      )}
      {...props}
    >
      <div className="p-3 bg-white rounded-full border border-slate-200 text-slate-400 mb-3 shadow-2xs">
        {icon || <Inbox className="w-6 h-6" aria-hidden="true" />}
      </div>
      <h4 className="text-base font-bold text-slate-900 mb-1">{title}</h4>
      <p className="text-xs text-slate-500 max-w-xs mb-4 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

/* 3. Error State */
export interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
  className,
  ...props
}: ErrorStateProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'border border-rose-200 bg-rose-50/50 rounded-xl p-6 sm:p-8 text-center flex flex-col items-center justify-center max-w-md mx-auto',
        className
      )}
      role="alert"
      {...props}
    >
      <div className="p-3 bg-rose-100 text-rose-600 rounded-full mb-3">
        <AlertCircle className="w-6 h-6" aria-hidden="true" />
      </div>
      <h4 className="text-base font-bold text-rose-950 mb-1">{title}</h4>
      <p className="text-xs text-rose-800 max-w-xs mb-4 leading-relaxed">{message}</p>
      {onRetry && (
        <Button
          variant="destructive"
          size="sm"
          onClick={onRetry}
          leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
        >
          Try Again
        </Button>
      )}
    </div>
  );
}

/* 4. Success State */
export interface SuccessStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function SuccessState({
  title,
  message,
  actionLabel,
  onAction,
  className,
  ...props
}: SuccessStateProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'border border-teal-200 bg-teal-50/40 rounded-xl p-6 sm:p-8 text-center flex flex-col items-center justify-center max-w-md mx-auto',
        className
      )}
      {...props}
    >
      <div className="p-3 bg-teal-100 text-teal-700 rounded-full mb-3">
        <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
      </div>
      <h4 className="text-base font-bold text-teal-950 mb-1">{title}</h4>
      <p className="text-xs text-teal-800 max-w-xs mb-4 leading-relaxed">{message}</p>
      {actionLabel && onAction && (
        <Button
          variant="accent"
          size="sm"
          onClick={onAction}
          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
