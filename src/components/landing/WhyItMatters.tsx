import React from 'react';
import { Layers, Eye, Compass, Sparkles, Filter, SplitSquareVertical } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading.js';

export function WhyItMatters() {
  const concepts = [
    {
      number: '01',
      title: 'Repeated exposure',
      kicker: 'Algorithmic Concentration',
      icon: Filter,
      description:
        'Digital platforms are engineered to optimize engagement by surfacing content closely aligned with past interactions. Over time, this recurring exposure reinforces particular viewpoints while gradually filtering out unfamiliar ones.',
      takeaway: 'Familiarity is prioritized over breadth.',
    },
    {
      number: '02',
      title: 'Narrow framing',
      kicker: 'Narrative Compression',
      icon: SplitSquareVertical,
      description:
        'Complex social, scientific, and economic issues are frequently compressed into binary debates or simplified headlines. When coverage focuses on a single narrative angle, nuanced trade-offs and structural contexts become obscured.',
      takeaway: 'Nuanced trade-offs are reduced to binary extremes.',
    },
    {
      number: '03',
      title: 'Missing perspectives',
      kicker: 'Information Blindspots',
      icon: Compass,
      description:
        'Without multi-angle exploration, essential stakeholders—such as frontline workers, empirical researchers, local communities, and regulatory bodies—may remain entirely absent from a person’s daily information stream.',
      takeaway: 'Critical evidence and lived experiences are left unexamined.',
    },
  ];

  return (
    <section
      id="why-it-matters"
      aria-labelledby="why-it-matters-heading"
      className="py-16 sm:py-24 bg-white border-b border-slate-200/80 text-left"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          kicker="Understanding Modern Feeds"
          title="WHY THIS MATTERS"
          description="Modern digital platforms personalize everyday information experiences. When repeated algorithmic signals favor familiar angles, recognizing what is missing becomes an essential civic and media-literacy skill."
          className="mb-12"
        />

        {/* 3 Conceptual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {concepts.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.number}
                className="bg-[var(--background)] border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:border-slate-300 hover:shadow-xs group"
              >
                <div>
                  {/* Top Badge with Number & Icon */}
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <span className="font-mono text-2xl font-extrabold text-blue-600 tracking-tight">
                      {item.number}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center text-slate-700 shadow-2xs group-hover:text-blue-600 transition-colors">
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Kicker & Title */}
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    {item.kicker}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-3">
                    {item.title}
                  </h3>

                  {/* Body Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Key Insight Footer */}
                <div className="pt-4 border-t border-slate-200/80 text-xs font-medium text-slate-700 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" aria-hidden="true" />
                  <span className="italic">{item.takeaway}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
