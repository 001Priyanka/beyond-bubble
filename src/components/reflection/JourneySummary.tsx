import React from 'react';
import { Check, Compass, Layers, ShieldCheck, HelpCircle } from 'lucide-react';
import { cn } from '../../lib/utils.js';

export interface JourneySummaryProps {
  className?: string;
}

export function JourneySummary({ className }: JourneySummaryProps): React.JSX.Element {
  const steps = [
    {
      title: 'Explored a simulated information environment',
      description: 'Configured curation controls and observed content distribution patterns.',
      icon: Layers,
    },
    {
      title: 'Examined perspective diversity',
      description: 'Measured topic framing concentration through entropy distribution.',
      icon: Compass,
    },
    {
      title: 'Explored an underrepresented perspective',
      description: 'Engaged directly with viewpoint angles outside the algorithmic majority.',
      icon: HelpCircle,
    },
    {
      title: 'Practiced media-literacy skills',
      description: 'Evaluated emotional framing, evidence criteria, source details, and study limits.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div
      id="journey-summary-panel"
      className={cn(
        'bg-slate-50/80 border border-slate-200/90 rounded-2xl p-6 sm:p-7 space-y-4',
        className
      )}
    >
      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
        <span>Learning Journey Completed</span>
      </div>

      <div className="space-y-3.5 pt-1">
        {steps.map((step, idx) => {
          return (
            <div key={idx} className="flex items-start gap-3">
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 mt-0.5 shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
              </div>
              <div className="space-y-0.5">
                <span className="text-sm font-bold text-slate-900 leading-tight block">
                  {step.title}
                </span>
                <span className="text-xs text-slate-500 font-normal leading-relaxed">
                  {step.description}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
