import React, { useState } from 'react';
import {
  Layers,
  Users,
  FileText,
  Compass,
  GraduationCap,
  ArrowRight,
  BarChart2,
  CheckCircle2,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading.js';
import { PerspectiveTag } from '../ui/PerspectiveTag.js';
import { DiversityScore } from '../ui/DiversityScore.js';
import { PerspectiveCard } from '../ui/PerspectiveCard.js';
import { cn } from '../../lib/utils.js';

export function FeaturePreview() {
  const [activeTab, setActiveTab] = useState<
    'perspective' | 'source' | 'framing' | 'missing' | 'literacy'
  >('perspective');

  const tabs = [
    {
      id: 'perspective' as const,
      label: 'Perspective Diversity',
      icon: Layers,
      tag: 'Distribution',
    },
    {
      id: 'source' as const,
      label: 'Source Diversity',
      icon: Users,
      tag: 'Citations',
    },
    {
      id: 'framing' as const,
      label: 'Information Framing',
      icon: FileText,
      tag: 'Narrative',
    },
    {
      id: 'missing' as const,
      label: 'Missing Perspectives',
      icon: Compass,
      tag: 'Blindspots',
    },
    {
      id: 'literacy' as const,
      label: 'Media Literacy',
      icon: GraduationCap,
      tag: 'Exercises',
    },
  ];

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="py-16 sm:py-24 bg-[var(--background)] border-b border-slate-200/80 text-left"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          kicker="Core Exploration Capabilities"
          title="WHAT YOU WILL DISCOVER"
          description="Beyond the Bubble provides interactive analytical tools to inspect viewpoint distribution, compare evidence, and practice critical media literacy."
          className="mb-10"
        />

        {/* Tab Navigation Pill Bar */}
        <div
          role="tablist"
          aria-label="Feature Previews"
          className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-8 no-scrollbar"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer border select-none',
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900'
                )}
              >
                <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Feature Preview Stage */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
          {/* 1. Perspective Diversity */}
          {activeTab === 'perspective' && (
            <div
              id="panel-perspective"
              role="tabpanel"
              aria-labelledby="tab-perspective"
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-6 space-y-4">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60">
                  Feature Preview • Perspective Spectrum
                </span>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  Categorized Viewpoint Balance
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Understand how content is distributed across standardized societal lenses:
                  Civic & Regulatory, Academic Research, Industry & Markets, Community Voices,
                  Ethics & Values, and Workforce Conditions.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <PerspectiveTag category="civic" size="sm" />
                  <PerspectiveTag category="academic" size="sm" />
                  <PerspectiveTag category="industry" size="sm" />
                  <PerspectiveTag category="community" size="sm" />
                  <PerspectiveTag category="ethics" size="sm" />
                  <PerspectiveTag category="workforce" size="sm" />
                </div>
              </div>

              <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
                <div className="text-xs font-semibold text-slate-800 flex items-center justify-between">
                  <span>Simulated Perspective Composition</span>
                  <span className="text-[11px] text-slate-400 font-mono">Sample Scenario</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                      <span className="font-semibold text-indigo-700">Academic & Empirical Research</span>
                      <span className="font-mono">40%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded-full w-[40%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                      <span className="font-semibold text-teal-700">Industry & Enterprise Market</span>
                      <span className="font-mono">35%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-teal-600 h-full rounded-full w-[35%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                      <span className="font-semibold text-sky-700">Civic & Policy Frameworks</span>
                      <span className="font-mono">15%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-sky-600 h-full rounded-full w-[15%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                      <span className="font-semibold text-amber-700">Grassroots & Worker Lived Experience</span>
                      <span className="font-mono">10%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full w-[10%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. Source Diversity */}
          {activeTab === 'source' && (
            <div
              id="panel-source"
              role="tabpanel"
              aria-labelledby="tab-source"
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-6 space-y-4">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200/60">
                  Feature Preview • Source Attribution
                </span>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  Transparent Source Origins
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Analyze whether your feed relies on institutional reports, independent journalism,
                  advocacy briefs, academic repositories, or anonymous commentary. Recognize how source
                  variety impacts credibility.
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 pt-1">
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="font-semibold block text-slate-900">Peer-Reviewed Journals</span>
                    <span className="text-[11px] text-slate-500">Methodological rigor</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="font-semibold block text-slate-900">Institutional Governance</span>
                    <span className="text-[11px] text-slate-500">Regulatory standards</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
                <div className="text-xs font-semibold text-slate-800">
                  Source Typology Breakdown
                </div>
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200">
                    <span className="font-sans font-medium text-slate-800">Academic & Think Tanks</span>
                    <span className="text-blue-600 font-bold">4 Sources</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200">
                    <span className="font-sans font-medium text-slate-800">Investigative Journalism</span>
                    <span className="text-blue-600 font-bold">3 Sources</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200">
                    <span className="font-sans font-medium text-slate-800">Industry & Trade Associations</span>
                    <span className="text-blue-600 font-bold">3 Sources</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200">
                    <span className="font-sans font-medium text-slate-800">Independent Labor / Community</span>
                    <span className="text-slate-400 font-bold">1 Source (Under-represented)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. Information Framing */}
          {activeTab === 'framing' && (
            <div
              id="panel-framing"
              role="tabpanel"
              aria-labelledby="tab-framing"
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-6 space-y-4">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60">
                  Feature Preview • Framing Analysis
                </span>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  Linguistic Framing & Narrative Angle
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Identify whether headlines and summaries frame issues through technological inevitability,
                  economic risk, ethical dilemmas, or human rights. Learn how tone dictates public urgency.
                </p>
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Detects urgency cues and speculative vs. empirical tone</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Examines headline vs. body copy nuance</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-2.5">
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Headline Framing Example A
                  </span>
                  <div className="font-bold text-slate-900">
                    "Automation to Overhaul 40% of Entry-Level Roles by 2030"
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    Frame: <span className="font-semibold text-amber-700">Alarmist / Technological Inevitability</span>
                  </p>
                </div>
                <div className="p-3.5 bg-blue-50/50 border border-blue-200/70 rounded-xl text-xs space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                    Contrasting Framing Example B
                  </span>
                  <div className="font-bold text-slate-900">
                    "Workplace Study Finds AI Augments Collaborative Tasks in Pilot Programs"
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    Frame: <span className="font-semibold text-blue-700">Empirical / Collaborative Adaptation</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 4. Missing Perspectives */}
          {activeTab === 'missing' && (
            <div
              id="panel-missing"
              role="tabpanel"
              aria-labelledby="tab-missing"
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-6 space-y-4">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200/60">
                  Feature Preview • Blindspot Detection
                </span>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  Unencountered Viewpoint Discovery
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Beyond the Bubble highlights viewpoints completely omitted from the simulated feed
                  and provides inquiry questions to investigate alternative stakeholder positions.
                </p>
                <div className="p-3 bg-purple-50 border border-purple-200/70 rounded-xl text-xs text-purple-900 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span>
                    Generates constructive inquiry prompts rather than feeding partisan arguments.
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6">
                <PerspectiveCard
                  title="Frontline Worker Transition & Reskilling Realities"
                  category="workforce"
                  stanceSummary="Emphasizes that technology transitions succeed when workers participate in tool design and have paid reskilling pathways."
                  keyArguments={[
                    'Top-down deployment without frontline input leads to high failure rates.',
                    'Productivity gains are rarely shared without contractual agreements.',
                  ]}
                  reflectionQuestion="How might workflow changes affect junior staff who rely on routine tasks for initial skill development?"
                  missingIndicator={true}
                />
              </div>
            </div>
          )}

          {/* 5. Media Literacy */}
          {activeTab === 'literacy' && (
            <div
              id="panel-literacy"
              role="tabpanel"
              aria-labelledby="tab-literacy"
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-6 space-y-4">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60">
                  Feature Preview • Interactive Challenge
                </span>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  Critical Reflection & Media Literacy
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Test your ability to spot narrative bias, evaluate the evidentiary strength of articles,
                  and formulate well-rounded questions before forming a conclusion.
                </p>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Identify omitted evidence in simulated claims</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Practice cross-referencing institutional sources</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Download or save personal synthesis reflections</span>
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200">
                  <span className="font-bold text-slate-900">Sample Media Challenge</span>
                  <span className="text-[11px] text-blue-600 font-medium">Question 1 of 3</span>
                </div>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  "Which critical perspective is missing from a post that only cites vendor ROI figures?"
                </p>
                <div className="space-y-1.5 text-xs">
                  <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-slate-600 hover:border-slate-300 transition-colors">
                    A) Secondary marketing forecasts
                  </div>
                  <div className="p-2.5 bg-blue-50 border border-blue-300 rounded-lg font-semibold text-blue-900 flex items-center justify-between">
                    <span>B) Independent longitudinal workforce studies</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-slate-600 hover:border-slate-300 transition-colors">
                    C) Celebrity influencer endorsements
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
