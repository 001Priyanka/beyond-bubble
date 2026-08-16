import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, ShieldCheck, Heart, Sparkles, ExternalLink } from 'lucide-react';
import { AboutModal } from '../landing/AboutModal.js';

export function Footer() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'about' | 'privacy'>('about');

  const openAbout = (tab: 'about' | 'privacy') => {
    setModalTab(tab);
    setModalOpen(true);
  };

  const handleHowItWorksClick = (e: React.MouseEvent) => {
    const element = document.getElementById('how-it-works');
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <footer className="border-t border-slate-200 bg-white text-slate-600 text-xs mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Brand Column */}
            <div className="md:col-span-5 space-y-3 text-left">
              <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base">
                <div className="p-1.5 bg-slate-900 text-white rounded-md">
                  <Compass className="w-4 h-4" aria-hidden="true" />
                </div>
                <span className="tracking-tight">Beyond the Bubble</span>
              </div>
              <p className="text-slate-500 max-w-sm leading-relaxed">
                An interactive media-literacy experience. Exploring algorithmic concentration, viewpoint diversity, and perspective discovery for the digital age.
              </p>
              <div className="inline-block px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-[11px] text-slate-600 font-mono">
                Educational prototype — simulated information environments.
              </div>
            </div>

            {/* Navigation Links */}
            <div className="md:col-span-3 space-y-3 text-left">
              <div className="font-semibold text-slate-900 uppercase tracking-wider text-[11px]">
                Exploration
              </div>
              <ul className="space-y-2">
                <li>
                  <Link to="/explore" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">
                    Explore Simulated Feeds
                  </Link>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    onClick={handleHowItWorksClick}
                    className="text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <Link to="/design-system" className="text-slate-600 hover:text-blue-600 transition-colors inline-flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-blue-500" />
                    <span>Design System</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Transparency & Legal Column */}
            <div className="md:col-span-4 space-y-3 text-left">
              <div className="font-semibold text-slate-900 uppercase tracking-wider text-[11px]">
                Trust & Ethics
              </div>
              <ul className="space-y-2">
                <li>
                  <button
                    type="button"
                    onClick={() => openAbout('about')}
                    className="text-slate-600 hover:text-blue-600 transition-colors cursor-pointer text-left"
                  >
                    About the Project & Mission
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => openAbout('privacy')}
                    className="text-slate-600 hover:text-blue-600 transition-colors cursor-pointer text-left inline-flex items-center gap-1"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Privacy & Data Ethics</span>
                  </button>
                </li>
              </ul>
              <p className="text-[11px] text-slate-400 leading-normal pt-1">
                Developed for the UNESCO Youth Hackathon. Independent educational submission. Not an official UNESCO publication or partnership.
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
            <div>
              © {new Date().getFullYear()} Beyond the Bubble. Open educational prototype.
            </div>
            <div className="flex items-center gap-4">
              <span>Zero tracking cookies</span>
              <span>•</span>
              <span>Pure client simulation</span>
            </div>
          </div>
        </div>
      </footer>

      <AboutModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialTab={modalTab}
      />
    </>
  );
}
