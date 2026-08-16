import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button.js';

export function FinalCTA() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="py-16 sm:py-24 bg-gradient-to-b from-white to-slate-100/70 border-b border-slate-200/80 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200/70 rounded-full text-xs font-semibold text-blue-700 tracking-tight shadow-2xs">
          <Compass className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Ready to Begin?</span>
        </div>

        {/* Headline */}
        <div className="space-y-2">
          <h2
            id="final-cta-heading"
            className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight uppercase"
          >
            STEP OUTSIDE <br className="hidden sm:inline" />
            <span className="text-blue-600">THE BUBBLE.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-medium">
            Explore a different way of seeing.
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-sm mx-auto">
          <Link to="/explore" className="w-full">
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" aria-hidden="true" />}
              className="w-full font-bold px-8 py-4 shadow-sm text-sm justify-center"
            >
              Begin Exploration
            </Button>
          </Link>
        </div>

        {/* Subtext info */}
        <p className="text-xs text-slate-400 font-mono pt-2">
          Interactive educational simulation • No signup required
        </p>
      </div>
    </section>
  );
}
