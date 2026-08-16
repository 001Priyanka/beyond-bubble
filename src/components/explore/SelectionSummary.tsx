import React from 'react';
import { Layers, Sparkles, CheckCircle2, RotateCcw, Compass, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils.js';
import { CONTENT_FORMAT_OPTIONS, ATTENTION_TYPE_OPTIONS } from '../../../shared/constants.js';
import type { Topic } from '../../../shared/types.js';

export interface SelectionSummaryProps {
  topic: Topic | null;
  selectedFormats: string[];
  selectedAttentionTypes: string[];
  onReset?: () => void;
  className?: string;
}

export function SelectionSummary({
  topic,
  selectedFormats,
  selectedAttentionTypes,
  onReset,
  className,
}: SelectionSummaryProps) {
  const formatLabels = selectedFormats
    .map((id) => CONTENT_FORMAT_OPTIONS.find((f) => f.id === id)?.label)
    .filter(Boolean);

  const attentionLabels = selectedAttentionTypes
    .map((id) => ATTENTION_TYPE_OPTIONS.find((a) => a.id === id)?.label)
    .filter(Boolean);

  return (
    <div
      aria-label="Simulation Configuration Summary"
      className={cn('bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 shadow-2xs space-y-4 text-left', className)}
    >
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600" aria-hidden="true" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
            Selected Configuration Summary
          </h3>
        </div>

        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="text-[11px] font-medium text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        {/* Chosen Topic */}
        <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 border border-slate-200/60">
          <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">
            01. Exploration Topic
          </div>
          {topic ? (
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="truncate">{topic.name}</span>
            </div>
          ) : (
            <div className="text-amber-700 italic text-[11px]">No topic selected yet</div>
          )}
        </div>

        {/* Formats Selected */}
        <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 border border-slate-200/60">
          <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">
            02. Formats ({formatLabels.length})
          </div>
          {formatLabels.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {formatLabels.slice(0, 3).map((label) => (
                <span
                  key={label}
                  className="px-1.5 py-0.5 rounded bg-blue-50 border border-blue-200/70 text-[10px] font-medium text-blue-800"
                >
                  {label}
                </span>
              ))}
              {formatLabels.length > 3 && (
                <span className="text-[10px] text-slate-500 font-mono self-center">
                  +{formatLabels.length - 3} more
                </span>
              )}
            </div>
          ) : (
            <div className="text-slate-400 italic text-[11px]">All formats included (default)</div>
          )}
        </div>

        {/* Attention Hooks Selected */}
        <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 border border-slate-200/60">
          <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">
            03. Framing Styles ({attentionLabels.length})
          </div>
          {attentionLabels.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {attentionLabels.slice(0, 3).map((label) => (
                <span
                  key={label}
                  className="px-1.5 py-0.5 rounded bg-slate-200/70 text-[10px] font-medium text-slate-800"
                >
                  {label}
                </span>
              ))}
              {attentionLabels.length > 3 && (
                <span className="text-[10px] text-slate-500 font-mono self-center">
                  +{attentionLabels.length - 3} more
                </span>
              )}
            </div>
          ) : (
            <div className="text-slate-400 italic text-[11px]">Balanced distribution (default)</div>
          )}
        </div>
      </div>
    </div>
  );
}
