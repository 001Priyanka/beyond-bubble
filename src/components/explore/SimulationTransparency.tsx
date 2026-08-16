import React from 'react';
import { ArrowRight, ShieldCheck, Lock, Sparkles, AlertCircle, Info } from 'lucide-react';
import { Button } from '../ui/Button.js';
import { cn } from '../../lib/utils.js';
import type { Topic } from '../../../shared/types.js';

export interface SimulationTransparencyProps {
  selectedTopic: Topic | null;
  onSubmit: () => void;
  isSubmitting?: boolean;
  className?: string;
}

export function SimulationTransparency({
  selectedTopic,
  onSubmit,
  isSubmitting = false,
  className,
}: SimulationTransparencyProps) {
  const isReady = Boolean(selectedTopic);

  return (
    <div
      aria-labelledby="simulation-transparency-heading"
      className={cn(
        'bg-white border border-slate-200/90 rounded-xl p-6 sm:p-8 shadow-sm space-y-6 text-left relative overflow-hidden',
        className
      )}
    >
      {/* Top Banner & Label */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-mono font-bold tracking-wider text-slate-700">
            <span>SIMULATED • EDUCATIONAL</span>
          </div>
          <h2
            id="simulation-transparency-heading"
            className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight uppercase"
          >
            YOUR SIMULATION
          </h2>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200/70 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
          <span>Zero Tracking Verified</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-700 font-medium leading-relaxed">
        We'll create a sample information environment based on your selections.
      </p>

      {/* Prominent Privacy Statement Box */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 space-y-2">
        <div className="flex items-start gap-2.5">
          <Lock className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-xs sm:text-sm leading-relaxed font-semibold text-slate-900">
            Important Privacy Commitment
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6.5">
          This is not your real social-media feed. We do not connect to your social-media accounts, messages, or browsing history.
        </p>
      </div>

      {/* Topic selection feedback if not selected */}
      {!selectedTopic && (
        <div
          role="alert"
          className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800"
        >
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Please choose an exploration topic above to enable simulation creation.</span>
        </div>
      )}

      {/* Action Button */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-500 font-mono">
          {selectedTopic ? (
            <span className="text-blue-700 font-semibold">
              Ready to simulate: {selectedTopic.name}
            </span>
          ) : (
            <span>Step 1 of 3 awaiting topic selection</span>
          )}
        </div>

        <Button
          id="create-simulation-button"
          type="button"
          variant="primary"
          size="lg"
          disabled={!isReady || isSubmitting}
          isLoading={isSubmitting}
          onClick={onSubmit}
          rightIcon={<ArrowRight className="w-4 h-4" aria-hidden="true" />}
          className="w-full sm:w-auto font-bold px-8 py-3.5 shadow-sm text-sm justify-center"
        >
          Create My Simulation →
        </Button>
      </div>
    </div>
  );
}
