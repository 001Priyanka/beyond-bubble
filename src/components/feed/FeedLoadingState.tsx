import React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils.js';

export interface FeedLoadingStateProps {
  className?: string;
  itemCount?: number;
}

export function FeedLoadingState({ className, itemCount = 4 }: FeedLoadingStateProps) {
  return (
    <div
      role="status"
      aria-label="Loading simulated environment content"
      className={cn('space-y-4 text-left', className)}
    >
      <div className="flex items-center gap-2 p-4 rounded-xl bg-blue-50/60 border border-blue-200/60 text-xs text-blue-800 font-medium">
        <Sparkles className="w-4 h-4 text-blue-600 animate-spin" aria-hidden="true" />
        <span>Constructing your deterministic simulated information environment...</span>
      </div>

      <div className="space-y-4">
        {Array.from({ length: itemCount }).map((_, index) => (
          <div
            key={index}
            className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-2xs space-y-4 animate-pulse"
          >
            {/* Header placeholder */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="w-1/3 h-4 bg-slate-200 rounded" />
              <div className="w-16 h-4 bg-slate-200 rounded" />
            </div>

            {/* Perspective pill placeholder */}
            <div className="flex items-center gap-2">
              <div className="w-24 h-6 bg-slate-200 rounded-md" />
              <div className="w-20 h-6 bg-slate-100 rounded-md" />
            </div>

            {/* Headline placeholder */}
            <div className="space-y-2">
              <div className="w-full h-5 bg-slate-200 rounded" />
              <div className="w-4/5 h-5 bg-slate-200 rounded" />
            </div>

            {/* Body placeholder */}
            <div className="space-y-1.5 pt-1">
              <div className="w-full h-3.5 bg-slate-100 rounded" />
              <div className="w-full h-3.5 bg-slate-100 rounded" />
              <div className="w-2/3 h-3.5 bg-slate-100 rounded" />
            </div>

            {/* Footer placeholder */}
            <div className="flex items-center gap-2 pt-2">
              <div className="w-16 h-4 bg-slate-100 rounded" />
              <div className="w-20 h-4 bg-slate-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
