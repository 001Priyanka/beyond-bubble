import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils.js';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  loading?: boolean;
  'aria-label': string; // Mandatory for accessibility
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant = 'ghost',
      size = 'md',
      isLoading: isLoadingProp = false,
      loading: loadingProp = false,
      disabled,
      children,
      type = 'button',
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const isLoading = Boolean(isLoadingProp || loadingProp);
    const baseStyles =
      'inline-flex items-center justify-center rounded-lg transition-all duration-150 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--ring)] disabled:opacity-50 disabled:pointer-events-none cursor-pointer active:scale-[0.96] shrink-0';

    const variants: Record<string, string> = {
      primary: 'bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)]',
      accent: 'bg-[var(--accent-blue)] text-white hover:bg-[var(--accent-blue-hover)]',
      secondary: 'bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--secondary-hover)] border border-[var(--border)]',
      outline: 'bg-transparent text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--secondary)]',
      ghost: 'bg-transparent text-[var(--foreground)] hover:bg-[var(--secondary)]',
      destructive: 'bg-[var(--destructive)] text-white hover:opacity-90',
    };

    const sizes: Record<string, string> = {
      sm: 'w-8 h-8 p-1.5 text-xs',
      md: 'w-10 h-10 p-2 text-sm',
      lg: 'w-12 h-12 p-3 text-base',
    };

    return (
      <button
        ref={ref}
        type={type}
        aria-label={ariaLabel}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
