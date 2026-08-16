import React from 'react';
import {
  Video,
  Newspaper,
  MessageSquare,
  BookOpen,
  FileText,
  Zap,
  CheckSquare,
  BarChart3,
  Users,
  Radio,
  Check,
  Sliders,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '../../lib/utils.js';
import { CONTENT_FORMAT_OPTIONS, ATTENTION_TYPE_OPTIONS } from '../../../shared/constants.js';

export interface PreferenceSelectorProps {
  selectedFormats: string[];
  selectedAttentionTypes: string[];
  onToggleFormat: (formatId: string) => void;
  onToggleAttentionType: (typeId: string) => void;
  onSelectAllFormats?: () => void;
  onSelectAllAttention?: () => void;
  className?: string;
}

const FORMAT_ICONS: Record<string, React.ElementType> = {
  Video: Video,
  Newspaper: Newspaper,
  MessageSquare: MessageSquare,
  BookOpen: BookOpen,
  FileText: FileText,
};

const ATTENTION_ICONS: Record<string, React.ElementType> = {
  Zap: Zap,
  CheckSquare: CheckSquare,
  BarChart3: BarChart3,
  Users: Users,
  Radio: Radio,
};

export function PreferenceSelector({
  selectedFormats,
  selectedAttentionTypes,
  onToggleFormat,
  onToggleAttentionType,
  className,
}: PreferenceSelectorProps) {
  return (
    <div className={cn('space-y-8', className)}>
      {/* Section Header */}
      <div className="space-y-2 text-left">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200/70 text-[11px] font-mono font-semibold text-blue-700">
          <Sliders className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Step 2 — Simulation Environment</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight uppercase">
          WHAT WOULD YOUR FEED USUALLY LOOK LIKE?
        </h2>

        <p className="text-sm text-slate-600 leading-relaxed max-w-2xl font-normal">
          These choices only shape the simulation. We do not access or analyze your real social-media activity.
        </p>
      </div>

      {/* Choice Group 1: Content Formats */}
      <fieldset className="space-y-3 text-left">
        <legend className="text-sm font-bold text-slate-900 flex items-center justify-between w-full">
          <span>1. Content Formats (Select any that apply)</span>
          <span className="text-xs font-mono font-normal text-slate-500">
            {selectedFormats.length} of {CONTENT_FORMAT_OPTIONS.length} selected
          </span>
        </legend>

        <p className="text-xs text-slate-500">
          Choose the types of media formats you typically encounter in your daily digital routines:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
          {CONTENT_FORMAT_OPTIONS.map((opt) => {
            const isSelected = selectedFormats.includes(opt.id);
            const Icon = FORMAT_ICONS[opt.iconName || 'FileText'] || FileText;

            return (
              <button
                key={opt.id}
                type="button"
                role="checkbox"
                aria-checked={isSelected}
                onClick={() => onToggleFormat(opt.id)}
                className={cn(
                  'group text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-150 cursor-pointer flex items-start gap-3 select-none min-h-[64px]',
                  'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2',
                  isSelected
                    ? 'bg-blue-50/80 border-blue-600 ring-1 ring-blue-600/20 shadow-2xs'
                    : 'bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/70 shadow-2xs'
                )}
              >
                {/* Custom Accessible Checkbox Graphic */}
                <div
                  className={cn(
                    'w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors',
                    isSelected
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'border border-slate-300 bg-white text-transparent group-hover:border-slate-400'
                  )}
                  aria-hidden="true"
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-slate-900">
                    <Icon className="w-3.5 h-3.5 text-blue-600 shrink-0" aria-hidden="true" />
                    <span className="truncate">{opt.label}</span>
                  </div>
                  {opt.description && (
                    <p className="text-[11px] text-slate-500 leading-snug pt-0.5">
                      {opt.description}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Choice Group 2: Attention & Framing Types */}
      <fieldset className="space-y-3 text-left pt-2 border-t border-slate-200/70">
        <legend className="text-sm font-bold text-slate-900 flex items-center justify-between w-full">
          <span>2. Attention & Framing Style (Select any that apply)</span>
          <span className="text-xs font-mono font-normal text-slate-500">
            {selectedAttentionTypes.length} of {ATTENTION_TYPE_OPTIONS.length} selected
          </span>
        </legend>

        <p className="text-xs text-slate-500">
          Choose the narrative tones or emotional hooks that tend to draw your attention online:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
          {ATTENTION_TYPE_OPTIONS.map((opt) => {
            const isSelected = selectedAttentionTypes.includes(opt.id);
            const Icon = ATTENTION_ICONS[opt.iconName || 'Zap'] || Zap;

            return (
              <button
                key={opt.id}
                type="button"
                role="checkbox"
                aria-checked={isSelected}
                onClick={() => onToggleAttentionType(opt.id)}
                className={cn(
                  'group text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-150 cursor-pointer flex items-start gap-3 select-none min-h-[64px]',
                  'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2',
                  isSelected
                    ? 'bg-blue-50/80 border-blue-600 ring-1 ring-blue-600/20 shadow-2xs'
                    : 'bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/70 shadow-2xs'
                )}
              >
                {/* Custom Accessible Checkbox Graphic */}
                <div
                  className={cn(
                    'w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors',
                    isSelected
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'border border-slate-300 bg-white text-transparent group-hover:border-slate-400'
                  )}
                  aria-hidden="true"
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-slate-900">
                    <Icon className="w-3.5 h-3.5 text-blue-600 shrink-0" aria-hidden="true" />
                    <span className="truncate">{opt.label}</span>
                  </div>
                  {opt.description && (
                    <p className="text-[11px] text-slate-500 leading-snug pt-0.5">
                      {opt.description}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Reassuring Privacy Callout */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 text-left">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="text-xs text-slate-600 leading-relaxed">
          <span className="font-bold text-slate-800">Non-judgmental configuration: </span>
          Preferences are solely used to simulate sample distribution patterns. They are never interpreted as political, psychological, or ideological traits.
        </div>
      </div>
    </div>
  );
}
