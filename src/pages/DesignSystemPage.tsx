import React, { useState } from 'react';
import {
  Compass,
  Palette,
  Type,
  Square,
  LayoutGrid,
  TextCursorInput,
  Tag,
  Gauge,
  Sliders,
  BarChart3,
  Globe2,
  AlertCircle,
  Smartphone,
  Accessibility,
  Eye,
  CheckCircle2,
  Info,
  Shield,
  Search,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { Button } from '../components/ui/Button.js';
import { IconButton } from '../components/ui/IconButton.js';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card.js';
import { ContentCard } from '../components/ui/ContentCard.js';
import { PerspectiveCard } from '../components/ui/PerspectiveCard.js';
import { Badge } from '../components/ui/Badge.js';
import { PerspectiveTag } from '../components/ui/PerspectiveTag.js';
import { Input } from '../components/ui/Input.js';
import { Select } from '../components/ui/Select.js';
import { Textarea } from '../components/ui/Textarea.js';
import { Progress } from '../components/ui/Progress.js';
import { DiversityScore } from '../components/ui/DiversityScore.js';
import { SectionHeading } from '../components/ui/SectionHeading.js';
import { Breadcrumb } from '../components/ui/Breadcrumb.js';
import { Tooltip } from '../components/ui/Tooltip.js';
import { Modal } from '../components/ui/Modal.js';
import { Skeleton, EmptyState, ErrorState, SuccessState } from '../components/ui/FeedbackStates.js';
import { PerspectiveChart, PerspectiveDataPoint } from '../components/ui/PerspectiveChart.js';
import { InformationBubbleVisual } from '../components/ui/InformationBubbleVisual.js';
import { PERSPECTIVE_CATEGORIES, PerspectiveCategory } from '../../shared/constants.js';

export default function DesignSystemPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [sampleInput, setSampleInput] = useState('');
  const [scorePreview, setScorePreview] = useState<number>(34);

  const mockChartData: PerspectiveDataPoint[] = [
    { category: 'Civic / Regulatory', count: 2, percentage: 15, color: '#0284C7', description: 'Governance & consumer policy' },
    { category: 'Academic Research', count: 1, percentage: 8, color: '#4F46E5', description: 'Empirical studies & data' },
    { category: 'Industry / Economic', count: 7, percentage: 54, color: '#0D9488', description: 'Commercial & startup releases' },
    { category: 'Community / Labor', count: 2, percentage: 15, color: '#D97706', description: 'Frontline workforce impacts' },
    { category: 'Ethics & Values', count: 1, percentage: 8, color: '#9333EA', description: 'Long-term societal risks' },
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-16 text-slate-800">
      {/* Top Banner */}
      <div className="border-b border-slate-200 pb-6">
        <Breadcrumb
          items={[
            { label: 'Engineering' },
            { label: 'Design System Showcase', isCurrent: true },
          ]}
          className="mb-4"
        />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Phase 2 Design System
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Beyond the Bubble Design System
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              A comprehensive editorial and digital-literacy component system crafted for clarity, trust, accessibility, and perspective exploration.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Back to Top
            </Button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1: Brand Identity & Emotional Response
          ========================================================================= */}
      <section id="section-1" className="space-y-6">
        <SectionHeading
          kicker="Section 01"
          title="Brand Identity & Tone"
          description="Designed for UNESCO, educational institutions, youth organizations, and public digital-literacy initiatives."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 bg-slate-900 text-white border-slate-800 flex flex-col justify-between">
            <div>
              <div className="p-2 bg-blue-600 text-white rounded-lg w-fit mb-4">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Beyond the Bubble</h3>
              <p className="text-xs text-slate-300 font-mono italic mb-4">
                "See beyond your information bubble."
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                An interactive media-literacy platform helping young people understand their information environment, recognize limited viewpoint diversity, and discover alternative perspectives.
              </p>
            </div>
            <div className="pt-6 text-[11px] text-slate-500 font-mono border-t border-slate-800">
              Target Tone: Trust • Curiosity • Clarity • Intelligence • Calm • Exploration
            </div>
          </Card>

          <Card className="p-6 md:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Core Visual & Pedagogical Principles
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-blue-600" /> Non-Diagnostic Metric
                </div>
                <p className="text-slate-600">
                  Measures exposure within a simulated learning environment rather than asserting an ideological or psychological diagnosis of the user.
                </p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
                  <Globe2 className="w-3.5 h-3.5 text-teal-600" /> Unweighted Perspectives
                </div>
                <p className="text-slate-600">
                  Viewpoints are categorized cleanly (civic, academic, community, industry, ethics) without implying moral or intellectual superiority.
                </p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-600" /> Editorial Typography
                </div>
                <p className="text-slate-600">
                  Pairing modern clean sans-serif UI with editorial serif accents creates an environment evocative of quality journalism and scholarship.
                </p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> High-Contrast Accessibility
                </div>
                <p className="text-slate-600">
                  WCAG AA+ contrast adherence, semantic HTML elements, visible keyboard focus rings, and reduced-motion overrides throughout.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: Color System & Tokens
          ========================================================================= */}
      <section id="section-2" className="space-y-6">
        <SectionHeading
          kicker="Section 02"
          title="Color System & Design Tokens"
          description="A semantic, accessible token palette avoiding neon startup gradients and dark cybersecurity motifs."
        />

        <div className="space-y-4">
          <div className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
            Primary & Surface Tokens
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { label: 'Deep Navy Ink', token: '--primary', hex: '#0F172A', text: '#FFFFFF' },
              { label: 'Editorial Blue', token: '--accent-blue', hex: '#1D63ED', text: '#FFFFFF' },
              { label: 'Warm Off-White', token: '--background', hex: '#F8F9FA', text: '#0F172A' },
              { label: 'Card Surface', token: '--card', hex: '#FFFFFF', text: '#0F172A' },
              { label: 'Border Neutral', token: '--border', hex: '#E2E8F0', text: '#0F172A' },
              { label: 'Muted Slate', token: '--muted-foreground', hex: '#64748B', text: '#FFFFFF' },
            ].map((c) => (
              <div key={c.token} className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                <div
                  className="h-16 flex items-center justify-center font-mono text-xs font-bold"
                  style={{ backgroundColor: c.hex, color: c.text }}
                >
                  {c.hex}
                </div>
                <div className="p-2.5 bg-white text-left">
                  <div className="text-xs font-bold text-slate-900 truncate">{c.label}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{c.token}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-xs font-semibold text-slate-800 uppercase tracking-wider pt-2">
            Semantic Perspective Tokens
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {Object.values(PERSPECTIVE_CATEGORIES).map((cat) => (
              <div key={cat.id} className="border border-slate-200 rounded-xl p-3 bg-white text-left space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: cat.colorVar }} />
                  <span className="text-xs font-bold text-slate-900 truncate">{cat.label}</span>
                </div>
                <div
                  className="p-1.5 rounded text-[10px] font-mono border"
                  style={{ backgroundColor: cat.bgVar, borderColor: cat.borderVar, color: cat.colorVar }}
                >
                  {cat.id}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: Typography Scale
          ========================================================================= */}
      <section id="section-3" className="space-y-6">
        <SectionHeading
          kicker="Section 03"
          title="Typography Scale"
          description="Editorial scale designed for maximum clarity, generous line height, and cognitive readability."
        />

        <div className="bg-white border border-slate-200 rounded-xl p-6 divide-y divide-slate-100 text-left">
          <div className="py-4 first:pt-0">
            <div className="text-[11px] font-mono text-slate-400 mb-1">Display Title (36px / 2.25rem)</div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              See beyond your information bubble.
            </div>
          </div>

          <div className="py-4">
            <div className="text-[11px] font-mono text-slate-400 mb-1">Heading 1 (28px / 1.75rem)</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Investigate the viewpoints shaping your feed.
            </h1>
          </div>

          <div className="py-4">
            <div className="text-[11px] font-mono text-slate-400 mb-1">Heading 2 (20px / 1.25rem)</div>
            <h2 className="text-xl font-bold text-slate-900">
              Perspective Diversity Score & Breakdown
            </h2>
          </div>

          <div className="py-4">
            <div className="text-[11px] font-mono text-slate-400 mb-1">Heading 3 (16px / 1rem)</div>
            <h3 className="text-base font-semibold text-slate-900">
              What viewpoints might you be missing?
            </h3>
          </div>

          <div className="py-4">
            <div className="text-[11px] font-mono text-slate-400 mb-1">Body Large (16px / 1rem)</div>
            <p className="text-base text-slate-700 leading-relaxed max-w-3xl">
              Algorithms are engineered to maximize engagement by presenting content that reinforces existing browsing patterns. Understanding these information dynamics empowers young citizens to seek balanced viewpoints.
            </p>
          </div>

          <div className="py-4">
            <div className="text-[11px] font-mono text-slate-400 mb-1">Body Regular (14px / 0.875rem)</div>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              This controlled exercise demonstrates how exposure to a single narrative can skew perception of complex societal topics like artificial intelligence, climate regulation, or public health policy.
            </p>
          </div>

          <div className="py-4">
            <div className="text-[11px] font-mono text-slate-400 mb-1">Editorial Serif Accent (Newsreader)</div>
            <blockquote className="font-serif-editorial text-lg text-slate-800 italic border-l-2 border-blue-600 pl-4 py-1">
              "Your social feed is personalized. Your perspective doesn't have to be."
            </blockquote>
          </div>

          <div className="py-4 last:pb-0">
            <div className="text-[11px] font-mono text-slate-400 mb-1">Data / Numeric (Font Mono)</div>
            <div className="font-mono text-2xl font-bold text-slate-900 tracking-tight">
              Score: 78.50% • Entropy Index: 0.942
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: Buttons & Interactive Triggers
          ========================================================================= */}
      <section id="section-4" className="space-y-6">
        <SectionHeading
          kicker="Section 04"
          title="Buttons & Interactive Controls"
          description="High-contrast interactive buttons with accessible focus rings, loading states, and icon pairings."
        />

        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6 text-left">
          {/* Variants */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-800 uppercase tracking-wider">Button Variants</div>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary (Ink)</Button>
              <Button variant="accent">Accent (Civic Blue)</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link Style</Button>
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-2 pt-4 border-t border-slate-100">
            <div className="text-xs font-semibold text-slate-800 uppercase tracking-wider">Sizes</div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small (32px)</Button>
              <Button size="md">Medium (40px)</Button>
              <Button size="lg">Large (48px)</Button>
            </div>
          </div>

          {/* States */}
          <div className="space-y-2 pt-4 border-t border-slate-100">
            <div className="text-xs font-semibold text-slate-800 uppercase tracking-wider">Interactive States</div>
            <div className="flex flex-wrap items-center gap-3">
              <Button leftIcon={<Compass className="w-4 h-4" />}>With Left Icon</Button>
              <Button rightIcon={<ArrowRight className="w-4 h-4" />}>With Right Icon</Button>
              <Button isLoading>Loading State</Button>
              <Button disabled>Disabled Button</Button>
              <IconButton aria-label="Explore Topic" variant="secondary">
                <Search className="w-4 h-4" />
              </IconButton>
              <IconButton aria-label="Explore Topic Loading" isLoading variant="secondary">
                <Search className="w-4 h-4" />
              </IconButton>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: Cards & Containers
          ========================================================================= */}
      <section id="section-5" className="space-y-6">
        <SectionHeading
          kicker="Section 05"
          title="Cards & Specialized Content Containers"
          description="Content cards for simulated feed articles and perspective exploration containers."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* Content Card (Simulated Feed) */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-800 uppercase tracking-wider">Content Card (Feed Simulation)</div>
            <ContentCard
              title="Autonomous Systems in Healthcare: Evaluating Diagnostic Speed vs. Algorithmic Error"
              source="Journal of Medical Ethics & Technology"
              sourceType="journal"
              publishedTime="3h ago"
              category="academic"
              viewpointLabel="Peer-Reviewed Study"
              format="Peer-Reviewed Study"
              readTimeMinutes={4}
              snippet="A multi-hospital trial found that while AI diagnostic triage reduced patient waiting times by 38%, false positive rates increased when clinical staff relied exclusively on automated triage flags without secondary physician verification."
              onReadAction={() => alert('Article inspection modal triggered.')}
            />
          </div>

          {/* Perspective Card (Perspective Explorer) */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-800 uppercase tracking-wider">Perspective Card (What You Missed)</div>
            <PerspectiveCard
              title="Labor Unions Advocate for Mandated Human-in-the-Loop Oversight"
              category="workforce"
              missingIndicator={true}
              stanceSummary="Practitioners emphasize that automated workplace scheduling and triage models frequently fail to account for burnout, physical strain, and unpredictable on-ground bottlenecks."
              keyArguments={[
                'Algorithmic scheduling penalizes unexpected human triage emergencies.',
                'Frontline nurses report higher turnover under automated task-allocation systems.',
                'Advocates urge legislative caps on automated diagnostic scoring without human sign-off.',
              ]}
              reflectionQuestion="How might automated workflow tools affect the autonomy and job satisfaction of healthcare practitioners?"
              onExplore={() => alert('Investigate perspective triggered.')}
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: Inputs & Form Controls
          ========================================================================= */}
      <section id="section-6" className="space-y-6">
        <SectionHeading
          kicker="Section 06"
          title="Inputs & Form Controls"
          description="Clean, accessible form inputs with clear validation messaging and label association."
        />

        <div className="bg-white border border-slate-200 rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Search Information Topics"
            placeholder="e.g. Generative AI, Renewable Energy, Algorithmic Feeds"
            leftIcon={<Search className="w-4 h-4" />}
            helperText="Type a topic keyword to filter simulations."
            value={sampleInput}
            onChange={(e) => setSampleInput(e.target.value)}
          />

          <Input
            label="Topic Identifier with Validation Error"
            defaultValue="invalid_topic_format"
            errorMessage="Topic ID must contain only alphanumeric lowercase characters."
          />

          <Select
            label="Filter by Perspective Category"
            options={[
              { value: 'all', label: 'All Viewpoints (Unfiltered)' },
              { value: 'civic', label: 'Civic & Regulatory' },
              { value: 'academic', label: 'Academic & Research' },
              { value: 'industry', label: 'Industry & Economic' },
              { value: 'community', label: 'Community & Grassroots' },
              { value: 'ethics', label: 'Ethics & Philosophy' },
            ]}
          />

          <Textarea
            label="Reflective Journal Entry"
            placeholder="What unexpected arguments or perspectives did you notice during the simulated feed exercise?"
            charLimit={300}
            helperText="Your reflection is stored anonymously for your learning session."
          />
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: Badges & Perspective Tags
          ========================================================================= */}
      <section id="section-7" className="space-y-6">
        <SectionHeading
          kicker="Section 07"
          title="Badges & Perspective Tags"
          description="Standard status badges and unweighted, color-coded perspective category tags."
        />

        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6 text-left">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-800 uppercase tracking-wider">Perspective Category Tags</div>
            <div className="flex flex-wrap items-center gap-2.5">
              {(['civic', 'academic', 'industry', 'community', 'ethics', 'workforce'] as PerspectiveCategory[]).map((cat) => (
                <PerspectiveTag key={cat} category={cat} size="md" />
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-100">
            <div className="text-xs font-semibold text-slate-800 uppercase tracking-wider">Semantic Status Badges</div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="neutral">Neutral Slate</Badge>
              <Badge variant="info">Information</Badge>
              <Badge variant="success">Verified Claim</Badge>
              <Badge variant="warning">Unverified Source</Badge>
              <Badge variant="destructive">High Exposure Risk</Badge>
              <Badge variant="outline">Peer-Reviewed</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: Perspective Diversity Score Component
          ========================================================================= */}
      <section id="section-8" className="space-y-6">
        <SectionHeading
          kicker="Section 08"
          title="Perspective Diversity Score Component"
          description="Interactive showcase of the 50/30/20 explainable diversity score component across varying score tiers."
        />

        <div className="space-y-6">
          {/* Interactive Score Slider for testing */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-700">
              <span className="font-bold">Test Score Value: </span>
              <span className="font-mono font-bold text-blue-600">{scorePreview} / 100</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={scorePreview}
              onChange={(e) => setScorePreview(Number(e.target.value))}
              className="w-full sm:w-64 cursor-pointer"
              aria-label="Adjust score preview value"
            />
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" onClick={() => setScorePreview(28)}>Low (28)</Button>
              <Button size="sm" variant="secondary" onClick={() => setScorePreview(58)}>Mod (58)</Button>
              <Button size="sm" variant="secondary" onClick={() => setScorePreview(88)}>High (88)</Button>
            </div>
          </div>

          <DiversityScore
            score={scorePreview}
            topicTitle="Artificial Intelligence in Healthcare"
            breakdown={{
              viewpointDiversity: Math.round(scorePreview * 0.9),
              sourceDiversity: Math.round(scorePreview * 1.05 > 100 ? 100 : scorePreview * 1.05),
              contentDiversity: Math.round(scorePreview * 0.8),
            }}
          />
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: Progress Components
          ========================================================================= */}
      <section id="section-9" className="space-y-6">
        <SectionHeading
          kicker="Section 09"
          title="Progress Indicators"
          description="Linear progress bars, stepped indicators, and multi-segmented progress components."
        />

        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6 text-left">
          <Progress value={65} label="Feed Evaluation Completion" showValue variant="accent" />
          <Progress value={85} label="Source Diversity Milestone" showValue variant="success" />
          <Progress value={30} label="Perspective Coverage" showValue variant="warning" />

          {/* Segmented Progress */}
          <div className="pt-2">
            <div className="text-xs font-semibold text-slate-800 mb-2">
              Multi-Segment Perspective Ratio
            </div>
            <Progress
              value={100}
              variant="segmented"
              size="lg"
              segments={[
                { label: 'Industry', value: 50, color: '#0D9488' },
                { label: 'Civic', value: 20, color: '#0284C7' },
                { label: 'Academic', value: 15, color: '#4F46E5' },
                { label: 'Labor', value: 15, color: '#D97706' },
              ]}
            />
            <div className="flex flex-wrap items-center gap-4 mt-2 text-[11px] text-slate-500 font-mono">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#0D9488]" /> Industry (50%)</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#0284C7]" /> Civic (20%)</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#4F46E5]" /> Academic (15%)</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#D97706]" /> Labor (15%)</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: Data Visualization Foundation
          ========================================================================= */}
      <section id="section-10" className="space-y-6">
        <SectionHeading
          kicker="Section 10"
          title="Data Visualization Foundation"
          description="Recharts-powered responsive charts with built-in accessibility table fallbacks."
        />

        <PerspectiveChart
          title="Simulated Feed Viewpoint Distribution"
          description="Relative distribution of viewpoints encountered during the simulated feed interaction."
          data={mockChartData}
        />
      </section>

      {/* =========================================================================
          SECTION 11: Information Bubble Visual
          ========================================================================= */}
      <section id="section-11" className="space-y-6">
        <SectionHeading
          kicker="Section 11"
          title="Information Bubble Visual Component"
          description="Interactive visual representation of the core product metaphor: moving from a concentrated bubble to a broader perspective landscape."
        />

        <InformationBubbleVisual />
      </section>

      {/* =========================================================================
          SECTION 12: Feedback States (Loading, Empty, Error, Success)
          ========================================================================= */}
      <section id="section-12" className="space-y-6">
        <SectionHeading
          kicker="Section 12"
          title="Loading, Empty, Error & Success States"
          description="Standardized state containers for asynchronous transitions and user feedback."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Skeletons */}
          <Card className="p-6 space-y-3 text-left">
            <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">Loading Skeletons</h4>
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" />
            <Skeleton variant="rectangular" height={80} />
            <div className="flex gap-2 pt-2">
              <Skeleton variant="circular" />
              <div className="flex-1 space-y-2">
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="80%" />
              </div>
            </div>
          </Card>

          {/* Empty State */}
          <EmptyState
            title="No Perspectives Saved"
            description="You haven't added any viewpoints to your exploration bookmark list yet."
            actionLabel="Browse Topics"
            onAction={() => alert('Navigating to explore...')}
          />

          {/* Error State */}
          <ErrorState
            title="Unable to Load Feed Data"
            message="We could not retrieve the simulated feed items for this topic. Please check your network connection and retry."
            onRetry={() => alert('Retrying fetch...')}
          />

          {/* Success State */}
          <SuccessState
            title="Reflection Recorded"
            message="Your final reflection for this topic has been successfully captured."
            actionLabel="View Summary"
            onAction={() => alert('Proceeding to summary...')}
          />
        </div>
      </section>

      {/* =========================================================================
          SECTION 13: Responsive Layout Examples
          ========================================================================= */}
      <section id="section-13" className="space-y-6">
        <SectionHeading
          kicker="Section 13"
          title="Responsive Layout & Grid System"
          description="Adaptive grids from 375px mobile viewports to desktop multi-column flows."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {[1, 2, 3, 4].map((n) => (
            <Card key={n} className="p-5 border border-slate-200">
              <div className="text-xs font-mono text-slate-400 mb-1">Column {n} of 4</div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Responsive Module</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Stalls cleanly as a single full-width card on 375px screens and scales seamlessly to a 4-column row on desktop.
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 14: Accessibility Examples & Modal Dialog
          ========================================================================= */}
      <section id="section-14" className="space-y-6">
        <SectionHeading
          kicker="Section 14"
          title="Accessibility & Modal System"
          description="Keyboard-navigable dialogs, tooltips, focus management, and screen-reader optimizations."
        />

        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6 text-left">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary" onClick={() => setModalOpen(true)}>
              Open Accessible Modal Dialog
            </Button>

            <Tooltip content="Diversity Score indicates the variety of viewpoints, not factual accuracy.">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-medium cursor-help underline decoration-dotted"
              >
                <Info className="w-4 h-4" />
                <span>Hover / Focus for Tooltip</span>
              </button>
            </Tooltip>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 space-y-1.5">
            <div className="font-semibold text-slate-900 flex items-center gap-1.5">
              <Accessibility className="w-4 h-4 text-blue-600" />
              <span>Accessibility Checklist Verified</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li>Native HTML interactive buttons and links with visible focus rings</li>
              <li><code>aria-label</code> and <code>aria-describedby</code> attributes on form controls</li>
              <li>Accessible data table alternate view for Recharts charts</li>
              <li>Keyboard <kbd className="px-1.5 py-0.5 bg-slate-200 rounded text-[11px] font-mono">Escape</kbd> dismissal on modal dialogs</li>
              <li><code>@media (prefers-reduced-motion: reduce)</code> CSS override active</li>
            </ul>
          </div>
        </div>

        {/* Modal Instance */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Perspective Exploration Guide"
          description="How to interpret and evaluate diverse viewpoints in media literacy."
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="accent" size="sm" onClick={() => setModalOpen(false)}>
                Understand & Continue
              </Button>
            </>
          }
        >
          <div className="space-y-3 text-xs text-slate-600">
            <p>
              When analyzing a media narrative, asking who is speaking and what incentives they hold is essential:
            </p>
            <div className="space-y-2">
              <div className="p-2.5 bg-blue-50/70 border border-blue-200 rounded-lg">
                <span className="font-semibold text-blue-900">1. Source Diversity: </span>
                Are claims supported by academic institutions, regulatory filings, independent journalism, or commercial press releases?
              </div>
              <div className="p-2.5 bg-indigo-50/70 border border-indigo-200 rounded-lg">
                <span className="font-semibold text-indigo-900">2. Stakeholder Representation: </span>
                Are the people most directly affected by the policy or technology given voice in the reporting?
              </div>
            </div>
          </div>
        </Modal>
      </section>
    </div>
  );
}
