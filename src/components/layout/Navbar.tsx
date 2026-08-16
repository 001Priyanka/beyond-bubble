import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Compass, Menu, X, ArrowRight, Sparkles, Shield, Info } from 'lucide-react';
import { Button } from '../ui/Button.js';
import { AboutModal } from '../landing/AboutModal.js';
import { ROUTES } from '../../../shared/constants.js';
import { cn } from '../../lib/utils.js';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [aboutModalTab, setAboutModalTab] = useState<'about' | 'privacy'>('about');
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleHowItWorksClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const elem = document.getElementById('how-it-works');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  const openAbout = (tab: 'about' | 'privacy' = 'about') => {
    setAboutModalTab(tab);
    setAboutModalOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="border-b border-slate-200/90 bg-white/95 backdrop-blur-xs sticky top-0 z-40 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo & Name */}
          <Link
            to={ROUTES.HOME}
            className="flex items-center gap-2.5 text-slate-900 font-bold text-sm sm:text-base group select-none"
            aria-label="Beyond the Bubble - Home"
          >
            <div className="p-1.5 bg-slate-900 text-white rounded-lg group-hover:bg-blue-600 transition-colors shadow-2xs">
              <Compass className="w-4 h-4" aria-hidden="true" />
            </div>
            <span className="tracking-tight font-extrabold text-slate-900 group-hover:text-slate-800">
              Beyond the Bubble
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-slate-600"
          >
            <NavLink
              to={ROUTES.EXPLORE}
              className={({ isActive }) =>
                cn(
                  'px-3 py-2 rounded-lg transition-colors hover:text-slate-900 hover:bg-slate-50',
                  isActive && 'text-blue-600 bg-blue-50/70 font-bold'
                )
              }
            >
              Explore
            </NavLink>

            <a
              href="/#how-it-works"
              onClick={handleHowItWorksClick}
              className="px-3 py-2 rounded-lg transition-colors text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            >
              How it Works
            </a>

            <button
              type="button"
              onClick={() => openAbout('about')}
              className="px-3 py-2 rounded-lg transition-colors text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer"
            >
              About
            </button>

            {/* Subtle Design System link */}
            <NavLink
              to={ROUTES.DESIGN_SYSTEM}
              className={({ isActive }) =>
                cn(
                  'px-2.5 py-1.5 rounded-lg text-[11px] font-mono transition-colors text-slate-400 hover:text-blue-600 hover:bg-slate-50 flex items-center gap-1',
                  isActive && 'text-blue-600 bg-blue-50 font-semibold'
                )
              }
              title="Design System & UI Component Showcase"
            >
              <Sparkles className="w-3 h-3" />
              <span>UI Spec</span>
            </NavLink>
          </nav>

          {/* Desktop Primary CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link to={ROUTES.EXPLORE}>
              <Button
                variant="primary"
                size="sm"
                rightIcon={<ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />}
                className="font-bold px-4 py-2 text-xs shadow-2xs"
              >
                Begin Exploration
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-600 outline-hidden transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Drawer / Dropdown */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation-menu"
            className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-150 text-left"
          >
            <div className="flex flex-col space-y-1">
              <NavLink
                to={ROUTES.EXPLORE}
                className={({ isActive }) =>
                  cn(
                    'px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors',
                    isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'
                  )
                }
              >
                Explore
              </NavLink>

              <a
                href="/#how-it-works"
                onClick={handleHowItWorksClick}
                className="px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                How it Works
              </a>

              <button
                type="button"
                onClick={() => openAbout('about')}
                className="px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 text-left cursor-pointer"
              >
                About
              </button>

              <button
                type="button"
                onClick={() => openAbout('privacy')}
                className="px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 text-left cursor-pointer flex items-center justify-between"
              >
                <span>Privacy & Ethics</span>
                <Shield className="w-4 h-4 text-emerald-600" />
              </button>

              <NavLink
                to={ROUTES.DESIGN_SYSTEM}
                className="px-3 py-2.5 rounded-lg text-xs font-mono text-slate-500 hover:bg-slate-50 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                <span>Design System Spec</span>
              </NavLink>
            </div>

            {/* Mobile CTA */}
            <div className="pt-2 border-t border-slate-100">
              <Link to={ROUTES.EXPLORE} className="block w-full">
                <Button
                  variant="primary"
                  size="md"
                  rightIcon={<ArrowRight className="w-4 h-4" aria-hidden="true" />}
                  className="w-full justify-center font-bold"
                >
                  Begin Exploration
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* About & Privacy Modal */}
      <AboutModal
        isOpen={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
        initialTab={aboutModalTab}
      />
    </>
  );
}
