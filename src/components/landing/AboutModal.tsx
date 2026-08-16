import React from 'react';
import { Compass, ShieldCheck, Info, Heart, Award, FileCode, CheckCircle2, Lock } from 'lucide-react';
import { Modal } from '../ui/Modal.js';
import { Button } from '../ui/Button.js';

export interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'about' | 'privacy';
}

export function AboutModal({ isOpen, onClose, initialTab = 'about' }: AboutModalProps) {
  const [tab, setTab] = React.useState<'about' | 'privacy'>(initialTab);

  React.useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={tab === 'about' ? 'About Beyond the Bubble' : 'Privacy & Educational Transparency'}
      maxWidth="lg"
      footer={
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      }
    >
      {/* Switcher Tab */}
      <div className="flex items-center gap-1 border-b border-slate-200 pb-3 mb-4 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setTab('about')}
          className={`px-3 py-1.5 rounded-md cursor-pointer transition-colors ${
            tab === 'about'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Project Overview
        </button>
        <button
          type="button"
          onClick={() => setTab('privacy')}
          className={`px-3 py-1.5 rounded-md cursor-pointer transition-colors ${
            tab === 'privacy'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Privacy & Ethics Notice
        </button>
      </div>

      {tab === 'about' ? (
        <div className="space-y-4 text-xs text-slate-600 leading-relaxed text-left">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 flex items-start gap-2.5">
            <Compass className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Educational Mission: </span>
              Beyond the Bubble is an interactive media-literacy prototype developed for the UNESCO Youth Hackathon.
              It fosters critical inquiry and helps young people understand how information environments become concentrated.
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              Why Simulated Environments?
            </h4>
            <p>
              Real social platforms use black-box proprietary ranking algorithms that cannot be safely or transparently audited inside a classroom. By utilizing controlled, simulated information environments, students can safely dissect exposure patterns without fear of tracking or personal profiling.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              Methodology & Scoring Transparency
            </h4>
            <p>
              Perspective diversity is measured using an open, explainable weighted index (50% perspective entropy, 30% source variety, 20% tone/framing balance). No black-box AI makes arbitrary judgments on user beliefs.
            </p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-500">
            <span className="font-semibold text-slate-700">Hackathon Disclaimer: </span>
            This project is an independent educational prototype submitted for hackathon evaluation. It does not claim formal partnership, endorsement, or organizational approval from UNESCO.
          </div>
        </div>
      ) : (
        <div className="space-y-4 text-xs text-slate-600 leading-relaxed text-left">
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Zero Data Collection Guarantee: </span>
              Beyond the Bubble operates with zero personal tracking, zero third-party advertising cookies, and zero social media account connections.
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900">
              Guiding Privacy Commitments
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>No Account Scraping:</strong> We do not ask for or connect to personal X, TikTok, Meta, YouTube, or Reddit accounts.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>No Belief Profiling:</strong> The platform does not diagnose or categorize users' personal political or religious beliefs.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Local Session Storage:</strong> Interactive challenge progress is kept locally in your current browser session and is wiped when you leave.
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Modal>
  );
}
