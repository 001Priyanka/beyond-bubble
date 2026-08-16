import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '../../lib/utils.js';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
}

export function Breadcrumb({
  items,
  showHome = true,
  className,
  ...props
}: BreadcrumbProps & React.HTMLAttributes<HTMLElement>) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center text-xs text-slate-500', className)} {...props}>
      <ol className="flex items-center space-x-1 sm:space-x-2 flex-wrap">
        {showHome && (
          <li className="inline-flex items-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <Home className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="sr-only sm:not-sr-only">Home</span>
            </Link>
          </li>
        )}

        {items.map((item, index) => {
          const isLast = index === items.length - 1 || item.isCurrent;

          return (
            <li key={index} className="inline-flex items-center">
              {(showHome || index > 0) && (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 mx-1 shrink-0" aria-hidden="true" />
              )}
              {isLast || !item.href ? (
                <span className="font-semibold text-slate-900 truncate max-w-[160px] sm:max-w-none" aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="text-slate-500 hover:text-slate-900 transition-colors truncate max-w-[140px] sm:max-w-none"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
