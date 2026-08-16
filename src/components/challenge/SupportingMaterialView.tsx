import React from 'react';
import { Newspaper, MessageSquareQuote, Check, X, Info } from 'lucide-react';
import { cn } from '../../lib/utils.js';
import type { ChallengeSupportingMaterial } from '../../../shared/types.js';

export interface SupportingMaterialViewProps {
  material: ChallengeSupportingMaterial;
  className?: string;
}

export function SupportingMaterialView({
  material,
  className,
}: SupportingMaterialViewProps): React.JSX.Element {
  if (material.type === 'headlines') {
    return (
      <div className={cn('space-y-3', className)}>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <Newspaper className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
          <span>Compare the two headlines:</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Headline A */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2">
            <span className="inline-block px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-200/80 text-slate-700">
              {material.headlineA.label}
            </span>
            <p className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
              &ldquo;{material.headlineA.text}&rdquo;
            </p>
          </div>

          {/* Headline B */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2">
            <span className="inline-block px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-200/80 text-slate-700">
              {material.headlineB.label}
            </span>
            <p className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
              &ldquo;{material.headlineB.text}&rdquo;
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (material.type === 'statement') {
    return (
      <div className={cn('space-y-2', className)}>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <MessageSquareQuote className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
          <span>Examine the following claim:</span>
        </div>

        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2">
          <p className="text-base sm:text-lg font-semibold text-slate-900 italic leading-relaxed">
            &ldquo;{material.statement}&rdquo;
          </p>
          {material.attribution && (
            <p className="text-xs text-slate-500 font-mono">— {material.attribution}</p>
          )}
        </div>
      </div>
    );
  }

  if (material.type === 'source-comparison') {
    return (
      <div className={cn('space-y-3', className)}>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <Info className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
          <span>Compare the information provided by each source:</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* SOURCE A */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3">
            <div className="flex items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
              <span className="font-bold text-sm text-slate-900">{material.sourceA.name}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-800">
                {material.sourceA.tag}
              </span>
            </div>

            <ul className="space-y-2 text-xs text-slate-600">
              {material.sourceA.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2">
                  <X className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* SOURCE B */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3">
            <div className="flex items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
              <span className="font-bold text-sm text-slate-900">{material.sourceB.name}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-800">
                {material.sourceB.tag}
              </span>
            </div>

            <ul className="space-y-2 text-xs text-slate-600">
              {material.sourceB.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (material.type === 'study-claim') {
    return (
      <div className={cn('space-y-2', className)}>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <Newspaper className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
          <span>Consider this study report:</span>
        </div>

        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2">
          <p className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed">
            &ldquo;{material.claim}&rdquo;
          </p>
          {material.contextNote && (
            <p className="text-xs text-slate-500 font-mono">• {material.contextNote}</p>
          )}
        </div>
      </div>
    );
  }

  return <div />;
}
