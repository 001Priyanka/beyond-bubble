import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, CheckCircle2, AlertCircle, Sparkles, ArrowRight, ShieldCheck, Database } from 'lucide-react';
import { HeroSection } from '../components/landing/HeroSection.js';
import { TransparencySection } from '../components/landing/TransparencySection.js';
import { WhyItMatters } from '../components/landing/WhyItMatters.js';
import { HowItWorks } from '../components/landing/HowItWorks.js';
import { PhilosophySection } from '../components/landing/PhilosophySection.js';
import { FeaturePreview } from '../components/landing/FeaturePreview.js';
import { FinalCTA } from '../components/landing/FinalCTA.js';
import type { HealthCheckResponse } from '../../shared/types.js';

export default function HomePage() {
  const [health, setHealth] = useState<HealthCheckResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Preserve Phase 1 backend check
    fetch('/api/health')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: HealthCheckResponse) => {
        setHealth(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full">
      {/* 1. Hero Section with Interactive Information Bubble Visual */}
      <HeroSection />

      {/* 2. Trust & Privacy Transparency Section */}
      <TransparencySection />

      {/* 3. Why This Matters (Educational Exploration of Algorithms) */}
      <WhyItMatters />

      {/* 4. How It Works (3-Step Connected Journey) */}
      <HowItWorks />

      {/* 5. Core Philosophy Editorial Statement */}
      <PhilosophySection />

      {/* 6. What the User Will Discover (Feature Preview) */}
      <FeaturePreview />

      {/* 7. Final Call to Action */}
      <FinalCTA />

      {/* Phase 1 & 2 Infrastructure Diagnostics Ribbon (Subtle Footnote) */}
      <div className="bg-slate-50 border-t border-slate-200 py-6 px-4 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600 shrink-0" aria-hidden="true" />
            <span className="font-semibold text-slate-700">Platform Status:</span>
            {loading ? (
              <span className="font-mono text-slate-400">Verifying API...</span>
            ) : error ? (
              <span className="text-rose-600 font-medium inline-flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> API Offline ({error})
              </span>
            ) : (
              <span className="text-emerald-700 font-medium inline-flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                API v{health?.version} Healthy ({health?.environment})
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span className="text-slate-600">DB: {health?.database.state || 'connecting'}</span>
            <span>•</span>
            <Link to="/design-system" className="text-blue-600 hover:underline">
              Design System Spec
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
