import React from 'react';
import { Pause, Search, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils.js';

export interface HabitCardProps {
  className?: string;
}

export function HabitCard({ className }: HabitCardProps): React.JSX.Element {
  const pillars = [
    {
      action: 'PAUSE',
      subtitle: 'Before accepting or sharing a strong claim.',
      icon: Pause,
      accent: 'border-blue-300 bg-blue-50/70 text-blue-900',
      badge: 'bg-blue-600 text-white',
    },
    {
      action: 'CHECK',
      subtitle: 'The source, evidence and context.',
      icon: Search,
      accent: 'border-indigo-300 bg-indigo-50/70 text-indigo-900',
      badge: 'bg-indigo-600 text-white',
    },
    {
      action: 'EXPLORE',
      subtitle: 'Perspectives you may not have encountered.',
      icon: Sparkles,
      accent: 'border-sky-300 bg-sky-50/70 text-sky-900',
      badge: 'bg-sky-600 text-white',
    },
  ];

  return (
    <div
      id="core-takeaway-habit-card"
      className={cn(
        'relative overflow-hidden rounded-2xl border-2 border-blue-600 bg-white p-6 sm:p-8 shadow-sm space-y-6',
        className
      )}
    >
      {/* Editorial Header */}
      <div className="space-y-1 text-center">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600">
          ONE HABIT TO TAKE WITH YOU
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-mono tracking-tight uppercase">
          PAUSE. CHECK. EXPLORE.
        </h2>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        {pillars.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={cn(
                'p-4 sm:p-5 rounded-xl border flex flex-col justify-between space-y-3 transition-all',
                item.accent
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={cn(
                    'px-2.5 py-1 rounded-md text-xs font-mono font-black tracking-wider uppercase',
                    item.badge
                  )}
                >
                  {item.action}
                </span>
                <Icon className="w-4 h-4 opacity-75" aria-hidden="true" />
              </div>

              <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                {item.subtitle}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
