import React from 'react';
import { Newspaper, BookOpen, MessageSquare, Video, FileText, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils.js';
import type { SimulatedContentItem } from '../../../shared/types.js';

export interface RepresentativeContentCardProps {
  item: SimulatedContentItem;
  className?: string;
  key?: React.Key;
}

export function RepresentativeContentCard({
  item,
  className,
}: RepresentativeContentCardProps): React.JSX.Element {
  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'news-articles':
        return <Newspaper className="w-3.5 h-3.5" aria-hidden="true" />;
      case 'opinion-posts':
        return <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />;
      case 'educational-content':
        return <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />;
      case 'short-form-videos':
        return <Video className="w-3.5 h-3.5" aria-hidden="true" />;
      default:
        return <FileText className="w-3.5 h-3.5" aria-hidden="true" />;
    }
  };

  return (
    <article
      className={cn(
        'bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 shadow-2xs space-y-3.5 text-left flex flex-col justify-between transition-all hover:border-slate-300',
        className
      )}
    >
      <div className="space-y-2.5">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-900 text-slate-100 px-2 py-0.5 rounded">
              <Sparkles className="w-2.5 h-2.5 text-blue-400" aria-hidden="true" />
              SIMULATED CONTENT
            </span>
            <span className="text-xs font-medium text-slate-600 font-serif">
              {item.sourceName}
            </span>
          </div>

          <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            {item.sourceType}
          </span>
        </div>

        {/* Headline */}
        <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug font-serif">
          {item.headline}
        </h4>

        {/* Body Content */}
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
          {item.content}
        </p>
      </div>

      {/* Footer / Context Tags */}
      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-500">
        <div className="flex items-center gap-1.5 truncate max-w-[280px]">
          <span className="text-slate-400">Framing:</span>
          <span className="text-slate-800 font-medium truncate">{item.framing}</span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {getFormatIcon(item.format as string)}
          <span className="capitalize">{item.format?.replace('-', ' ') || 'article'}</span>
        </div>
      </div>
    </article>
  );
}
