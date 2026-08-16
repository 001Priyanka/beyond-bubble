import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, HelpCircle, Layers, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button.js';
import { BubbleHeroVisual } from './BubbleHeroVisual.js';

export interface HeroSectionProps {
  onHowItWorksClick?: () => void;
}

export function HeroSection({ onHowItWorksClick }: HeroSectionProps) {
  const handleScrollToHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onHowItWorksClick) {
      onHowItWorksClick();
    } else {
      const element = document.getElementById('how-it-works');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative pt-8 pb-14 sm:pt-14 sm:pb-20 border-b border-slate-200/80 bg-gradient-to-b from-slate-50/50 via-white to-white"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Kicker / Category Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200/70 rounded-full text-xs font-semibold text-blue-700 tracking-tight shadow-2xs">
              <Compass className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Interactive Media-Literacy Experience</span>
            </div>

            {/* Primary Headline */}
            <div className="space-y-3">
              <h1
                id="hero-heading"
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.08]"
              >
                SEE BEYOND <br />
                <span className="text-blue-600">YOUR FEED.</span>
              </h1>

              <p className="text-lg sm:text-xl font-medium text-slate-800 leading-snug">
                Your social feed is personalized. <br className="hidden sm:inline" />
                <span className="text-slate-900 font-semibold">Your perspective doesn't have to be.</span>
              </p>
            </div>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
              Explore a simulated information environment, understand which perspectives dominate it,
              and discover what might be missing.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link to="/explore" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" aria-hidden="true" />}
                  className="w-full sm:w-auto font-semibold px-6 py-3.5 shadow-sm justify-center"
                >
                  Begin Exploration
                </Button>
              </Link>

              <a
                href="#how-it-works"
                onClick={handleScrollToHowItWorks}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto font-medium px-5 py-3.5 border-slate-300 text-slate-700 hover:bg-slate-50 justify-center"
                >
                  How it works
                </Button>
              </a>
            </div>

            {/* Educational Trust Tag */}
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              <span>Simulated educational scenarios • No personal data or login required</span>
            </div>
          </div>

          {/* Right Column: Information Bubble Visual */}
          <div className="lg:col-span-6 w-full">
            <BubbleHeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
