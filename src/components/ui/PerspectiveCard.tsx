import React from 'react';
import { ArrowRight, HelpCircle, Compass } from 'lucide-react';
import { PerspectiveCategory } from '../../../shared/constants.js';
import { PerspectiveTag } from './PerspectiveTag.js';
import { cn } from '../../lib/utils.js';

export interface PerspectiveCardProps {
  title: string;
  category: PerspectiveCategory;
  stanceSummary: string;
  keyArguments: string[];
  reflectionQuestion?: string;
  missingIndicator?: boolean; // Highlight that this is an unencountered perspective
  onExplore?: () => void;
  className?: string;
}

export function PerspectiveCard({
  title,
  category,
  stanceSummary,
  keyArguments,
  reflectionQuestion,
  missingIndicator = false,
  onExplore,
  className,
  ...props
}: PerspectiveCardProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'bg-white border border-slate-200 rounded-xl p-6 transition-all duration-200 hover:border-slate-300 hover:shadow-sm flex flex-col justify-between relative overflow-hidden',
        missingIndicator && 'border-indigo-200 bg-linear-to-b from-indigo-50/30 to-white',
        className
      )}
      {...props}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <PerspectiveTag category={category} size="md" />
          {missingIndicator && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">
              <Compass className="w-3 h-3" aria-hidden="true" />
              Unexplored Perspective
            </span>
          )}
        </div>

        <h4 className="text-base font-bold text-slate-900 mb-2 leading-snug">
          {title}
        </h4>

        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          {stanceSummary}
        </p>

        {/* Key Core Arguments */}
        <div className="space-y-1.5 mb-4">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Core Arguments & Evidence
          </div>
          <ul className="space-y-1">
            {keyArguments.map((arg, idx) => (
              <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                <span className="text-slate-400 mt-0.5">•</span>
                <span>{arg}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Thought / Reflection Prompt */}
        {reflectionQuestion && (
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-2 text-xs text-slate-700 mb-4">
            <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <span className="font-semibold text-slate-900">Inquiry: </span>
              <span className="italic">{reflectionQuestion}</span>
            </div>
          </div>
        )}
      </div>

      {onExplore && (
        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onExplore}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer p-1.5 rounded-md hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-blue-600 outline-hidden"
          >
            <span>Investigate this viewpoint</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
