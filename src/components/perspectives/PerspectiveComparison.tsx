import React from 'react';
import { ArrowLeftRight, Check, HelpCircle, Layers, Scale } from 'lucide-react';
import { cn } from '../../lib/utils.js';
import type { PerspectiveDetail } from '../../../shared/types.js';

export interface PerspectiveComparisonProps {
  currentPerspective: PerspectiveDetail;
  allPerspectives: PerspectiveDetail[];
  comparisonPerspective: PerspectiveDetail | null;
  onSelectComparison: (id: string | null) => void;
  className?: string;
}

export function PerspectiveComparison({
  currentPerspective,
  allPerspectives,
  comparisonPerspective,
  onSelectComparison,
  className,
}: PerspectiveComparisonProps) {
  const otherPerspectives = allPerspectives.filter(
    (p) => p.id !== currentPerspective.id && p.name !== currentPerspective.name
  );

  return (
    <section
      id="perspective-comparison-section"
      aria-labelledby="comparison-heading"
      className={cn(
        'bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 text-left',
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-700 uppercase tracking-wider">
            <Scale className="w-4 h-4" aria-hidden="true" />
            <span>Side-by-Side Contextual Comparison</span>
          </div>
          <h2 id="comparison-heading" className="text-lg sm:text-xl font-bold text-slate-900 font-serif">
            COMPARE PERSPECTIVES
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-normal">
            Compare how different stakeholders approach the same underlying issue.
          </p>
        </div>

        {/* Perspective Selector Dropdown / Pills */}
        <div className="flex items-center gap-2">
          <label htmlFor="comparison-select" className="text-xs font-mono text-slate-500 shrink-0">
            Compare with:
          </label>
          <select
            id="comparison-select"
            value={comparisonPerspective?.id || ''}
            onChange={(e) => onSelectComparison(e.target.value || null)}
            className="text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="">-- Choose a perspective --</option>
            {otherPerspectives.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {comparisonPerspective ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Column 1: Current Perspective */}
          <div className="p-5 rounded-xl bg-blue-50/40 border border-blue-200/80 space-y-4">
            <div className="flex items-center justify-between border-b border-blue-200/60 pb-2">
              <span className="text-xs font-mono font-bold text-blue-800 uppercase tracking-wider">
                Primary Selection
              </span>
              <span className="text-xs font-bold text-slate-900 font-serif">
                {currentPerspective.name}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <span className="font-mono font-semibold text-slate-500 uppercase text-[10px]">
                  Main Focus:
                </span>
                <p className="text-slate-800 font-normal leading-relaxed">
                  {currentPerspective.comparison.mainFocus}
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-mono font-semibold text-slate-500 uppercase text-[10px]">
                  Key Concern:
                </span>
                <p className="text-slate-800 font-normal leading-relaxed">
                  {currentPerspective.comparison.keyConcern}
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-mono font-semibold text-slate-500 uppercase text-[10px]">
                  Evidence Emphasized:
                </span>
                <p className="text-slate-800 font-normal leading-relaxed">
                  {currentPerspective.comparison.evidenceEmphasized}
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-mono font-semibold text-slate-500 uppercase text-[10px]">
                  Questions Raised:
                </span>
                <p className="text-slate-800 font-normal leading-relaxed">
                  {currentPerspective.comparison.questionsRaised}
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Comparison Perspective */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-xs font-mono font-bold text-slate-600 uppercase tracking-wider">
                Comparative Dimension
              </span>
              <span className="text-xs font-bold text-slate-900 font-serif">
                {comparisonPerspective.name}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <span className="font-mono font-semibold text-slate-500 uppercase text-[10px]">
                  Main Focus:
                </span>
                <p className="text-slate-800 font-normal leading-relaxed">
                  {comparisonPerspective.comparison.mainFocus}
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-mono font-semibold text-slate-500 uppercase text-[10px]">
                  Key Concern:
                </span>
                <p className="text-slate-800 font-normal leading-relaxed">
                  {comparisonPerspective.comparison.keyConcern}
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-mono font-semibold text-slate-500 uppercase text-[10px]">
                  Evidence Emphasized:
                </span>
                <p className="text-slate-800 font-normal leading-relaxed">
                  {comparisonPerspective.comparison.evidenceEmphasized}
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-mono font-semibold text-slate-500 uppercase text-[10px]">
                  Questions Raised:
                </span>
                <p className="text-slate-800 font-normal leading-relaxed">
                  {comparisonPerspective.comparison.questionsRaised}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center space-y-2">
          <ArrowLeftRight className="w-6 h-6 text-slate-400 mx-auto" aria-hidden="true" />
          <p className="text-xs text-slate-600 font-medium">
            Select an alternative perspective above to view a side-by-side comparison of focus areas and concerns.
          </p>
        </div>
      )}

      {/* Ethical Context Notice */}
      <div className="text-[11px] text-slate-500 bg-slate-50/80 p-3 rounded-lg border border-slate-100 font-mono leading-relaxed">
        <strong>Contextual Framework:</strong> Perspectives emphasize different aspects of the same issue
        based on distinct institutional roles, evidentiary frameworks, and stakeholders. Neither perspective is
        judged or ranked as "superior"—each illuminates different facets of complex public topics.
      </div>
    </section>
  );
}
