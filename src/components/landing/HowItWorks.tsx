import React from 'react';
import { Compass, BarChart3, Search, ArrowRight, Layers, CheckCircle2, Sliders, Shield } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading.js';

export function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'EXPLORE',
      subtitle: 'Simulated Feed Generation',
      icon: Compass,
      desc: 'Choose an inquiry topic—such as Artificial Intelligence in Work, Climate Transition, or Social Media Algorithms—and enter a controlled, simulated information environment designed around typical algorithmic exposure patterns.',
      features: [
        'Curated topic scenarios',
        'Simulated post feeds with diverse source types',
        'Neutral, non-judgmental observation mode',
      ],
      previewBadge: 'Topic Selection',
    },
    {
      step: '02',
      title: 'ANALYZE',
      subtitle: 'Diversity & Distribution Metrics',
      icon: BarChart3,
      desc: 'Inspect an explainable breakdown of the perspectives, stakeholder categories, and source types present in the stream. Understand which viewpoints dominate the narrative and which are quietly marginalized.',
      features: [
        '50/30/20 weighted diversity exposure gauge',
        'Breakdown across civic, academic, industry & community lenses',
        'Transparent mathematical metrics—no black-box scoring',
      ],
      previewBadge: 'Explainable Analytics',
    },
    {
      step: '03',
      title: 'DISCOVER',
      subtitle: 'Perspective Expansion & Challenge',
      icon: Search,
      desc: 'Investigate omitted viewpoints with structured inquiry prompts. Explore alternative evidentiary claims and complete brief interactive media-literacy challenges to sharpen your analytical reflexes.',
      features: [
        'Unencountered perspective cards & inquiry prompts',
        'Contrasting stakeholder arguments & evidence',
        'Interactive reflection and synthesis exercises',
      ],
      previewBadge: 'Media Literacy Skills',
    },
  ];

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="py-16 sm:py-24 bg-[var(--background)] border-b border-slate-200/80 text-left scroll-mt-14"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          kicker="Educational Methodology"
          title="HOW IT WORKS"
          description="A clear three-step learning journey designed to reveal algorithmic concentration and practice identifying unrepresented viewpoints."
          className="mb-14"
        />

        {/* 3 Step Visual Progression */}
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Visual Step Connectors (Visible on desktop) */}
          <div
            className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-200 via-indigo-200 to-teal-200 -translate-y-12 z-0"
            aria-hidden="true"
          />

          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative z-10 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col justify-between hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span className="inline-flex items-center justify-center px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-mono font-bold tracking-wider">
                      STEP {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/60 flex items-center justify-center text-blue-600 shadow-2xs">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-1 mb-4">
                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {item.desc}
                  </p>

                  {/* Key Highlights Checklist */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-slate-100">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Key Capabilities
                    </div>
                    <ul className="space-y-1.5">
                      {item.features.map((feat, fIdx) => (
                        <li key={fIdx} className="text-xs text-slate-700 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Tag */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>{item.previewBadge}</span>
                  <span className="text-slate-400 font-sans">0{idx + 1}/03</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
