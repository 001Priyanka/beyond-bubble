import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Compass,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Layers,
  Search,
  BookOpen,
  Scale,
  FileCheck2,
} from 'lucide-react';
import { RepresentativeContentCard } from './RepresentativeContentCard.js';
import { PerspectiveComparison } from './PerspectiveComparison.js';
import { cn } from '../../lib/utils.js';
import type { PerspectiveDetail, SimulatedContentItem } from '../../../shared/types.js';

export interface PerspectiveDetailViewProps {
  perspective: PerspectiveDetail;
  allPerspectives: PerspectiveDetail[];
  representativeContent: SimulatedContentItem[];
  contentLoading: boolean;
  comparisonPerspective: PerspectiveDetail | null;
  onSelectComparison: (id: string | null) => void;
  className?: string;
}

export function PerspectiveDetailView({
  perspective,
  allPerspectives,
  representativeContent,
  contentLoading,
  comparisonPerspective,
  onSelectComparison,
  className,
}: PerspectiveDetailViewProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      key={perspective.id}
      id="perspective-detail-experience"
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={cn('space-y-8 text-left', className)}
    >
      {/* 1. Header Banner & Inquiry Prompt */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full">
            <Compass className="w-3.5 h-3.5" aria-hidden="true" />
            Detailed Perspective Exploration
          </span>
          <span className="text-xs font-mono text-slate-500">
            Topic Focus: {perspective.topicId}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-serif uppercase">
          {perspective.name}
        </h2>

        <p className="text-sm sm:text-base text-slate-700 italic font-medium leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
          "{perspective.inquiryPrompt}"
        </p>
      </div>

      {/* 2. Perspective Overview (2-4 Neutral Paragraphs) */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
          <BookOpen className="w-4 h-4 text-slate-600" aria-hidden="true" />
          <span>Perspective Overview</span>
        </div>

        <div className="space-y-3.5 text-sm sm:text-base text-slate-700 leading-relaxed">
          {perspective.overviewParagraphs.map((para, idx) => (
            <p key={`overview-para-${idx}`} className="font-normal">
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* 3. Key Themes */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
          <Layers className="w-4 h-4 text-slate-600" aria-hidden="true" />
          <span>Key Focus Themes</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {perspective.keyThemes.map((theme, idx) => (
            <div
              key={`theme-${idx}`}
              className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70"
            >
              <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-semibold text-slate-800">{theme}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Representative Simulated Content */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 uppercase font-serif">
              REPRESENTATIVE SIMULATED CONTENT
            </h3>
            <p className="text-xs text-slate-500 font-normal">
              Controlled simulated articles and briefs illustrating this viewpoint's framing.
            </p>
          </div>

          <span className="text-xs font-mono text-slate-400">
            {representativeContent.length} simulated items
          </span>
        </div>

        {contentLoading ? (
          <div className="p-8 bg-white border border-slate-200 rounded-xl text-center text-xs font-mono text-slate-500">
            Loading representative content...
          </div>
        ) : representativeContent.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {representativeContent.map((item) => (
              <RepresentativeContentCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="p-6 bg-white border border-slate-200 rounded-xl text-xs text-slate-500">
            No simulated items found matching this perspective.
          </div>
        )}
      </div>

      {/* 5. Context / Assumptions: "WHAT DOES THIS PERSPECTIVE EMPHASIZE?" */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="space-y-1 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-700 uppercase tracking-wider">
            <FileCheck2 className="w-4 h-4" aria-hidden="true" />
            <span>Underlying Principles</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif uppercase">
            WHAT DOES THIS PERSPECTIVE EMPHASIZE?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-normal">
            Major priorities and assumptions that shape this stance.
          </p>
        </div>

        <div className="space-y-3">
          {perspective.assumptions.map((item, idx) => (
            <div
              key={`assumption-${idx}`}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80"
            >
              <div className="p-1 rounded-md bg-blue-100 text-blue-800 text-xs font-mono font-bold shrink-0 mt-0.5">
                0{idx + 1}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Critical Thinking: "WHAT WOULD YOU WANT TO CHECK?" */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md space-y-5">
        <div className="space-y-1.5 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
            <Search className="w-4 h-4" aria-hidden="true" />
            <span>Media Literacy & Evidence Evaluation</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white font-serif uppercase">
            WHAT WOULD YOU WANT TO CHECK?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 font-normal">
            Critical inquiry questions to evaluate claims and evidence from this viewpoint.
          </p>
        </div>

        <div className="space-y-2.5">
          {perspective.criticalQuestions.map((q, idx) => (
            <div
              key={`crit-q-${idx}`}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-800/90 border border-slate-700/80 text-xs sm:text-sm text-slate-200"
            >
              <HelpCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
              <span className="leading-relaxed font-normal">{q}</span>
            </div>
          ))}

          {/* Standard Media Literacy Heuristics */}
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-800/90 border border-slate-700/80 text-xs sm:text-sm text-slate-200">
            <HelpCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
            <span className="leading-relaxed font-normal">
              Is the source describing verifiable empirical evidence, institutional interpretation, or opinion?
            </span>
          </div>
        </div>
      </div>

      {/* 7. Lightweight Comparison Feature */}
      <PerspectiveComparison
        currentPerspective={perspective}
        allPerspectives={allPerspectives}
        comparisonPerspective={comparisonPerspective}
        onSelectComparison={onSelectComparison}
      />
    </motion.section>
  );
}
