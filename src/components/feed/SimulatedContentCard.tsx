import React from 'react';
import {
  FileText,
  Clock,
  Tag,
  Building2,
  Newspaper,
  BookOpen,
  Video,
  MessageSquare,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { WhyAmISeeingThis } from './WhyAmISeeingThis.js';
import { cn } from '../../lib/utils.js';
import type { SimulatedContentItem } from '../../../shared/types.js';

export interface SimulatedContentCardProps {
  item: SimulatedContentItem;
  topicName?: string;
  className?: string;
}

const FORMAT_ICONS: Record<string, React.ElementType> = {
  'news-articles': Newspaper,
  'short-form-videos': Video,
  'opinion-posts': MessageSquare,
  'educational-content': BookOpen,
  'expert-research': FileText,
};

const PERSPECTIVE_THEMES: Record<string, { bg: string; text: string; border: string }> = {
  'AI Optimistic': {
    bg: 'bg-blue-50',
    text: 'text-blue-800',
    border: 'border-blue-200/80',
  },
  'Worker Perspective': {
    bg: 'bg-amber-50',
    text: 'text-amber-900',
    border: 'border-amber-200/80',
  },
  'Regulation': {
    bg: 'bg-purple-50',
    text: 'text-purple-800',
    border: 'border-purple-200/80',
  },
  'Academic / Research': {
    bg: 'bg-emerald-50',
    text: 'text-emerald-800',
    border: 'border-emerald-200/80',
  },
  'Clean Energy & Market Innovation': {
    bg: 'bg-emerald-50',
    text: 'text-emerald-800',
    border: 'border-emerald-200/80',
  },
  'Climate Justice & Grassroots Action': {
    bg: 'bg-amber-50',
    text: 'text-amber-900',
    border: 'border-amber-200/80',
  },
  'Regulatory & Carbon Policy': {
    bg: 'bg-purple-50',
    text: 'text-purple-800',
    border: 'border-purple-200/80',
  },
  'Economic Transition & Energy Reliability': {
    bg: 'bg-indigo-50',
    text: 'text-indigo-800',
    border: 'border-indigo-200/80',
  },
  'Youth Vulnerability & Screen Risk': {
    bg: 'bg-rose-50',
    text: 'text-rose-800',
    border: 'border-rose-200/80',
  },
  'Community Connection & Empowerment': {
    bg: 'bg-teal-50',
    text: 'text-teal-800',
    border: 'border-teal-200/80',
  },
  'Algorithmic Transparency & Platform Reform': {
    bg: 'bg-purple-50',
    text: 'text-purple-800',
    border: 'border-purple-200/80',
  },
  'Digital Literacy & Individual Agency': {
    bg: 'bg-sky-50',
    text: 'text-sky-800',
    border: 'border-sky-200/80',
  },
};

export function SimulatedContentCard({
  item,
  topicName,
  className,
}: SimulatedContentCardProps) {
  const FormatIcon = FORMAT_ICONS[item.format] || FileText;
  const theme = PERSPECTIVE_THEMES[item.perspective] || {
    bg: 'bg-slate-50',
    text: 'text-slate-800',
    border: 'border-slate-200',
  };

  const headlineId = `headline-${item.id}`;

  return (
    <article
      id={`content-card-${item.id}`}
      aria-labelledby={headlineId}
      className={cn(
        'bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow text-left space-y-4 relative overflow-hidden',
        className
      )}
    >
      {/* 1. Header: Source Meta & Simulation Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
            <span className="truncate max-w-[200px] sm:max-w-xs">{item.sourceName}</span>
          </div>
          <span className="text-slate-300">•</span>
          <span className="text-[11px] text-slate-500 font-mono">{item.sourceType}</span>
        </div>

        {/* Clear Educational SIMULATED Badge */}
        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 border border-slate-200/80 text-[10px] font-mono font-bold tracking-wider text-slate-600 uppercase">
          <span>SIMULATED</span>
        </div>
      </div>

      {/* 2. Metadata Bar: Perspective Label & Format */}
      <div className="flex flex-wrap items-center gap-2">
        <div
          className={cn(
            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border',
            theme.bg,
            theme.text,
            theme.border
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
          <span>{item.perspective}</span>
        </div>

        <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-50 text-[11px] font-mono text-slate-600 border border-slate-200/60">
          <FormatIcon className="w-3 h-3 text-slate-400" aria-hidden="true" />
          <span className="capitalize">{item.format.replace(/-/g, ' ')}</span>
        </div>

        {item.readingTimeMinutes && (
          <div className="inline-flex items-center gap-1 text-[11px] text-slate-400 font-mono ml-auto">
            <Clock className="w-3 h-3" aria-hidden="true" />
            <span>{item.readingTimeMinutes} min read</span>
          </div>
        )}
      </div>

      {/* 3. Headline */}
      <h3
        id={headlineId}
        className="text-base sm:text-lg font-bold text-slate-900 leading-snug tracking-tight hover:text-blue-950 transition-colors"
      >
        {item.headline}
      </h3>

      {/* 4. Content Preview */}
      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
        {item.content}
      </p>

      {/* 5. Tags & Framing */}
      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center text-[10px] font-mono text-slate-500 bg-slate-50 hover:bg-slate-100 px-2 py-0.5 rounded border border-slate-200/60 transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* 6. Expandable "Why am I seeing this?" */}
      <WhyAmISeeingThis item={item} />
    </article>
  );
}
