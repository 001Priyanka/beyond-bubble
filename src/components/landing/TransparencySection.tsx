import React from 'react';
import { ShieldCheck, Lock, EyeOff, FileText, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils.js';

export function TransparencySection({ className }: { className?: string }) {
  const trustPoints = [
    {
      icon: EyeOff,
      title: 'Zero Account Access',
      desc: 'We never connect to, monitor, or scan your real social-media accounts, messages, or browser history.',
    },
    {
      icon: FileText,
      title: 'Simulated Data Models',
      desc: 'All feeds, metrics, and content samples are curated educational simulations designed to study algorithmic framing.',
    },
    {
      icon: ShieldCheck,
      title: 'Objective & Non-Judgmental',
      desc: 'No personal profiling or psychological diagnosis. Our purpose is building media-literacy and critical inquiry skills.',
    },
  ];

  return (
    <section
      aria-label="Trust and Transparency"
      className={cn('py-8 sm:py-10 bg-slate-900 text-white relative overflow-hidden', className)}
    >
      {/* Subtle Background Accent */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-slate-800">
          {/* Main Statement */}
          <div className="space-y-2 max-w-2xl text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-sky-400">
              <Lock className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Public Interest & Privacy Guarantee</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
              Built for exploration, not surveillance.
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Beyond the Bubble uses simulated information environments to teach media literacy.
              We never need access to your private social-media accounts, messages, or browsing history.
            </p>
          </div>

          {/* Quick Badges */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
              No Tracking Cookies
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
              Open Methodology
            </span>
          </div>
        </div>

        {/* 3 Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-left">
          {trustPoints.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-sky-400 shrink-0 mt-0.5">
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
