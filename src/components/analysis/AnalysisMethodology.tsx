import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Code2, CheckCircle } from 'lucide-react';
import { cn } from '../../lib/utils.js';

export interface AnalysisMethodologyProps {
  className?: string;
}

export function AnalysisMethodology({ className }: AnalysisMethodologyProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      id="analysis-methodology-section"
      aria-labelledby="methodology-heading"
      className={cn(
        'bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs text-left space-y-4',
        className
      )}
    >
      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
        <BookOpen className="w-4 h-4 text-blue-600" aria-hidden="true" />
        <span>Analytical Framework</span>
      </div>

      <div className="space-y-2">
        <h2
          id="methodology-heading"
          className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight"
        >
          HOW IS THIS CALCULATED?
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
          We measure how evenly perspectives, source types and content framing are distributed
          across the simulated feed. More balanced distributions produce higher diversity scores.
        </p>
      </div>

      {/* Expandable Methodology Accordion */}
      <div className="pt-2 border-t border-slate-100">
        <button
          type="button"
          id="toggle-methodology-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="methodology-details-panel"
          className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors py-2 cursor-pointer"
        >
          <span>{isOpen ? 'Hide technical methodology' : 'View mathematical methodology'}</span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4" aria-hidden="true" />
          ) : (
            <ChevronDown className="w-4 h-4" aria-hidden="true" />
          )}
        </button>

        {isOpen && (
          <div
            id="methodology-details-panel"
            className="mt-3 p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-4 text-xs text-slate-700 leading-relaxed animate-in fade-in duration-200"
          >
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-blue-600" />
                <span>Normalized Shannon Information Entropy</span>
              </h3>
              <p>
                To quantify diversity without subjective bias or language-model hallucination, we
                apply classical information theory (Shannon Entropy):
              </p>
              <div className="p-3 bg-white rounded-lg border border-slate-200 font-mono text-[11px] text-slate-900 space-y-1">
                <div>Raw Entropy: H = -Σ (p_i × ln(p_i))</div>
                <div>Normalized Diversity: D = H / ln(n)</div>
                <div>Component Score: S = D × 100</div>
              </div>
              <p className="text-[11px] text-slate-500">
                Where <code>p_i</code> represents the proportion of items in category <code>i</code>,
                and <code>n</code> represents the total number of distinct categories represented.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-200/60">
              <h4 className="font-bold text-slate-900">Dimension Weighting</h4>
              <ul className="space-y-1.5 list-disc list-inside text-[11px] text-slate-600">
                <li>
                  <strong className="text-slate-800">50% Viewpoint Diversity:</strong> Spread across
                  distinct ideological and analytical perspectives.
                </li>
                <li>
                  <strong className="text-slate-800">30% Source Diversity:</strong> Variety of
                  institutional sources (academic, industry, grassroots, regulatory).
                </li>
                <li>
                  <strong className="text-slate-800">20% Content Diversity:</strong> Distribution of
                  thematic narrative framings.
                </li>
              </ul>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-200/60">
              <h4 className="font-bold text-slate-900">Deterministic Properties</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>100% reproducible on identical feeds</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Bounded strictly between 0 and 100</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Safe mathematical edge handling</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Non-diagnostic pedagogical metric</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
