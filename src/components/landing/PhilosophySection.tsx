import React from 'react';
import { Compass, Sparkles, Quote, Shield } from 'lucide-react';

export function PhilosophySection() {
  return (
    <section
      aria-label="Core Philosophy"
      className="py-16 sm:py-24 bg-white border-b border-slate-200/80 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
        {/* Subtle Brand Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-xs font-semibold text-slate-700 tracking-tight shadow-2xs">
          <Compass className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
          <span>Core Educational Principle</span>
        </div>

        {/* Strong Statement */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] uppercase">
            WE DON'T TELL YOU <br className="hidden sm:inline" />
            <span className="text-slate-400">WHAT TO THINK.</span>
          </h2>

          <div className="pt-2">
            <p className="font-serif-editorial text-2xl sm:text-3xl md:text-4xl text-blue-700 font-medium italic leading-snug">
              "We help you notice what you might be missing."
            </p>
          </div>
        </div>

        {/* Narrative Synthesis */}
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Healthy digital democracy does not require uniform consensus—it requires awareness.
          By illuminating how information environments select and emphasize viewpoints,
          we equip young citizens with the critical lenses needed to seek evidence independently.
        </p>

        {/* 3 Principles Footnote */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-3xl mx-auto border-t border-slate-100">
          <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-200/70">
            <div className="text-xs font-bold text-slate-900 mb-0.5">Non-Partisan</div>
            <p className="text-[11px] text-slate-600 leading-normal">
              No political leaning or ideological agenda. All perspectives are classified descriptively.
            </p>
          </div>
          <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-200/70">
            <div className="text-xs font-bold text-slate-900 mb-0.5">Inquiry Driven</div>
            <p className="text-[11px] text-slate-600 leading-normal">
              Prompts encourage users to ask questions, examine evidence, and evaluate source authority.
            </p>
          </div>
          <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-200/70">
            <div className="text-xs font-bold text-slate-900 mb-0.5">Transparent Metrics</div>
            <p className="text-[11px] text-slate-600 leading-normal">
              Every exposure score is explicitly calculated from visible feed items with open formulas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
