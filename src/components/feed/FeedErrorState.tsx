import React from 'react';
import { AlertCircle, RefreshCw, Compass, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button.js';
import { ROUTES } from '../../../shared/constants.js';
import { cn } from '../../lib/utils.js';

export interface FeedErrorStateProps {
  error: string;
  onRetry: () => void;
  className?: string;
}

export function FeedErrorState({ error, onRetry, className }: FeedErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        'bg-white border border-rose-200 rounded-2xl p-6 sm:p-10 shadow-sm text-left space-y-6',
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-200/80">
          <AlertCircle className="w-6 h-6" aria-hidden="true" />
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-slate-900">
            Unable to Construct Simulated Environment
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {error || 'An unexpected error occurred while compiling your educational simulation.'}
          </p>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5">
        <div className="font-semibold text-slate-900">Troubleshooting Steps</div>
        <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
          <li>Verify your connection to the local simulation service.</li>
          <li>Ensure a valid topic was selected in Stage 1.</li>
          <li>Click Retry Simulation below to request the feed again.</li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
        <Button
          id="retry-feed-button"
          type="button"
          variant="primary"
          size="md"
          onClick={onRetry}
          leftIcon={<RefreshCw className="w-4 h-4" />}
          className="w-full sm:w-auto"
        >
          Retry Simulation
        </Button>

        <Link to={ROUTES.EXPLORE} className="w-full sm:w-auto">
          <Button
            type="button"
            variant="outline"
            size="md"
            leftIcon={<Compass className="w-4 h-4" />}
            className="w-full sm:w-auto text-xs"
          >
            Return to Exploration Setup
          </Button>
        </Link>
      </div>
    </div>
  );
}
