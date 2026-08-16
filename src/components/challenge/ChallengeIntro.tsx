import React from 'react';
import { Compass, Sparkles, Clock, ShieldCheck, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { cn } from '../../lib/utils.js';

export interface ChallengeIntroProps {
  onStart: () => void;
  topicName?: string;
  className?: string;
}

export function ChallengeIntro({
  onStart,
  topicName,
  className,
}: ChallengeIntroProps): React.JSX.Element {
  const concepts = [
    {
      title: '1. Emotional Framing',
      description: 'Observe how subtle tone and emotionally loaded vocabulary influence initial reactions.',
      icon: Layers,
    },
    {
      title: '2. Opinion vs Evidence',
      description: 'Distinguish confident predictions and assertions from empirical methodologies.',
      icon: ShieldCheck,
    },
    {
      title: '3. Source Credibility',
      description: 'Evaluate what information a source provides to allow independent examination.',
      icon: BookOpen,
    },
    {
      title: '4. Missing Context',
      description: 'Identify unstated study constraints, sampling scope, and correlation vs causation.',
      icon: Compass,
    },
  ];

  return (
    <div
      id="challenge-intro-view"
      className={cn('max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300', className)}
    >
      {/* Header Banner */}
      <div className="text-center space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
          <span>Interactive Media Literacy Experience</span>
        </div>

        <h1
          id="challenge-intro-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 uppercase font-mono"
        >
          CAN YOU SPOT THE SIGNAL?
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          You've explored different perspectives{topicName ? ` on ${topicName}` : ''}. Now test how
          carefully you can evaluate the information you encounter.
        </p>
      </div>

      {/* Overview Info Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5 text-slate-700 text-sm font-medium">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            <span>4 Interactive Challenges</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-mono">
            <Clock className="w-4 h-4 text-slate-400" aria-hidden="true" />
            <span>Estimated time: 2–4 minutes</span>
          </div>
        </div>

        {/* 4 Concept Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {concepts.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 space-y-1.5"
              >
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Icon className="w-4 h-4 text-blue-600 shrink-0" aria-hidden="true" />
                  <span>{c.title}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">{c.description}</p>
              </div>
            );
          })}
        </div>

        {/* Guiding Educational Principle */}
        <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-blue-900 leading-relaxed">
          <p className="font-semibold text-blue-950 mb-0.5">Non-judgmental learning:</p>
          This challenge is designed to sharpen your critical lens, not to grade your intelligence or
          persuade you toward any political stance. You will receive helpful explanations for every
          concept.
        </div>

        {/* CTA Button */}
        <div className="pt-2 flex justify-center">
          <button
            type="button"
            id="start-challenge-btn"
            onClick={onStart}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white font-bold text-base transition-all shadow-sm hover:shadow-md cursor-pointer"
          >
            <span>Start Challenge</span>
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
