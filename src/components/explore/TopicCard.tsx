import React from 'react';
import { Bot, Globe, HeartPulse, Check, Sparkles, Layers, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils.js';
import type { Topic } from '../../../shared/types.js';

export interface TopicCardProps {
  topic: Topic;
  isSelected: boolean;
  onSelect: (topicId: string) => void;
  disabled?: boolean;
  key?: React.Key;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Bot: Bot,
  Globe: Globe,
  HeartPulse: HeartPulse,
  Sparkles: Sparkles,
};

export function TopicCard({
  topic,
  isSelected,
  onSelect,
  disabled = false,
}: TopicCardProps) {
  const IconComponent = ICON_MAP[topic.icon] || Sparkles;

  const handleClick = () => {
    if (!disabled) {
      onSelect(topic.id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(topic.id);
    }
  };

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'group relative w-full text-left p-5 sm:p-6 rounded-xl border transition-all duration-200 cursor-pointer select-none',
        'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2',
        isSelected
          ? 'bg-blue-50/70 border-blue-600 ring-2 ring-blue-600/30 shadow-md transform -translate-y-0.5'
          : 'bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/60 shadow-2xs',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
      )}
    >
      {/* Selection checkmark indicator badge */}
      <div className="absolute top-4 right-4 sm:top-5 sm:right-5">
        <div
          className={cn(
            'w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200',
            isSelected
              ? 'bg-blue-600 text-white shadow-2xs scale-100'
              : 'border border-slate-300 bg-white text-transparent group-hover:border-slate-400'
          )}
          aria-hidden="true"
        >
          <Check className="w-3.5 h-3.5 stroke-[3]" />
        </div>
      </div>

      <div className="flex flex-col h-full space-y-4">
        {/* Top: Icon & Category Indicator */}
        <div className="flex items-center gap-3 pr-8">
          <div
            className={cn(
              'w-11 h-11 rounded-xl flex items-center justify-center transition-colors shrink-0',
              isSelected
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200/80 group-hover:text-slate-900'
            )}
            aria-hidden="true"
          >
            <IconComponent className="w-5 h-5" />
          </div>

          <div>
            <span
              className={cn(
                'text-[10px] font-mono font-bold uppercase tracking-wider block',
                isSelected ? 'text-blue-700' : 'text-slate-400'
              )}
            >
              Curated Topic
            </span>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              {topic.name}
            </h3>
          </div>
        </div>

        {/* Middle: Description */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal flex-1">
          {topic.description}
        </p>

        {/* Bottom: Tags and Perspective Counter */}
        <div className="pt-2 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2 text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-500 font-medium">
            <Layers className="w-3.5 h-3.5 text-blue-600 shrink-0" aria-hidden="true" />
            <span>{topic.perspectiveCount || 6} Key Perspectives</span>
          </div>

          <div
            className={cn(
              'font-semibold text-xs inline-flex items-center gap-1 transition-colors',
              isSelected ? 'text-blue-700' : 'text-slate-400 group-hover:text-slate-700'
            )}
          >
            <span>{isSelected ? 'Selected' : 'Select Topic'}</span>
            <ArrowRight className="w-3 h-3" aria-hidden="true" />
          </div>
        </div>
      </div>
    </button>
  );
}
