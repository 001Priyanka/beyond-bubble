import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, Sliders, Shield } from 'lucide-react';
import { cn } from '../../lib/utils.js';
import type { SimulatedContentItem } from '../../../shared/types.js';

export interface WhyAmISeeingThisProps {
  item: SimulatedContentItem;
  className?: string;
}

export function WhyAmISeeingThis({ item, className }: WhyAmISeeingThisProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = `why-panel-${item.id}`;
  const buttonId = `why-btn-${item.id}`;

  return (
    <div className={cn('border-t border-slate-100 pt-2.5 mt-3 text-left', className)}>
      <button
        id={buttonId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((prev) => !prev)}
        className="group inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors py-1 cursor-pointer font-medium"
      >
        <HelpCircle className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
        <span className="underline decoration-slate-300 group-hover:decoration-blue-500 underline-offset-2">
          Why am I seeing this?
        </span>
        {isOpen ? (
          <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        )}
      </button>

      {isOpen && (
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className="mt-2.5 p-3.5 sm:p-4 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-700 space-y-2.5 animate-in fade-in duration-200"
        >
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
            <p className="leading-relaxed font-normal text-slate-700">
              This simulated item was selected based on the topic and preferences used to construct
              this educational information environment.
            </p>
          </div>

          {/* Transparent Simulation Attributes Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-slate-200/60 text-[11px] font-mono">
            <div className="bg-white px-2.5 py-1.5 rounded border border-slate-200/60">
              <span className="text-slate-600 block font-semibold text-[10px] uppercase">
                Perspective Model
              </span>
              <span className="text-slate-900 font-bold">{item.perspective}</span>
            </div>

            <div className="bg-white px-2.5 py-1.5 rounded border border-slate-200/60">
              <span className="text-slate-600 block font-semibold text-[10px] uppercase">
                Content Framing
              </span>
              <span className="text-slate-800 truncate block">{item.framing}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-slate-600 font-mono pt-0.5">
            <Shield className="w-3 h-3 text-emerald-600" />
            <span>Controlled educational simulation • Zero private tracking</span>
          </div>
        </div>
      )}
    </div>
  );
}
