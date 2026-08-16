import React from 'react';
import { Clock, ExternalLink } from 'lucide-react';
import { PerspectiveCategory } from '../../../shared/constants.js';
import { PerspectiveTag } from './PerspectiveTag.js';
import { Badge } from './Badge.js';
import { cn } from '../../lib/utils.js';

export interface ContentCardProps {
  title: string;
  source: string;
  sourceType?: 'journal' | 'news_outlet' | 'advocacy' | 'industry_blog' | 'academic_institution' | 'social_thread';
  publishedTime?: string;
  category: PerspectiveCategory;
  viewpointLabel?: string;
  format?: 'Analytical Report' | 'Opinion Editorial' | 'Peer-Reviewed Study' | 'Policy Brief' | 'Field Report';
  snippet: string;
  readTimeMinutes?: number;
  isRead?: boolean;
  onReadAction?: () => void;
  className?: string;
}

export function ContentCard({
  title,
  source,
  sourceType = 'news_outlet',
  publishedTime = '2h ago',
  category,
  viewpointLabel,
  format = 'Analytical Report',
  snippet,
  readTimeMinutes = 3,
  isRead = false,
  onReadAction,
  className,
  ...props
}: ContentCardProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <article
      className={cn(
        'group relative bg-white border border-slate-200 rounded-xl p-5 transition-all duration-200 hover:border-slate-300 hover:shadow-sm flex flex-col justify-between',
        isRead && 'bg-slate-50/70 border-slate-200',
        className
      )}
      {...props}
    >
      <div>
        {/* Card Header Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <PerspectiveTag category={category} size="sm" customLabel={viewpointLabel} />
            <Badge variant="outline" size="sm">
              {format}
            </Badge>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{readTimeMinutes} min</span>
          </div>
        </div>

        {/* Title */}
        <h4 className="text-base font-semibold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors mb-2">
          {title}
        </h4>

        {/* Snippet / Excerpt */}
        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
          {snippet}
        </p>
      </div>

      {/* Card Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-slate-700 truncate max-w-[140px] sm:max-w-[200px]">{source}</span>
          <span className="text-slate-300">•</span>
          <span>{publishedTime}</span>
        </div>

        <div className="flex items-center gap-2">
          {onReadAction && (
            <button
              type="button"
              onClick={onReadAction}
              className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 cursor-pointer p-1 rounded hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-blue-600 outline-hidden"
              aria-label={`Read article: ${title}`}
            >
              <span>{isRead ? 'Reviewed' : 'Examine'}</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
