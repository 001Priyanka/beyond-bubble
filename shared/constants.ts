/**
 * Shared Constants for Beyond the Bubble
 */

export const APP_NAME = 'Beyond the Bubble';
export const APP_TAGLINE = 'See beyond your information bubble.';
export const APP_VERSION = '0.2.0';

export const ROUTES = {
  HOME: '/',
  EXPLORE: '/explore',
  FEED: '/feed',
  ANALYSIS: '/analysis',
  PERSPECTIVES: '/perspectives',
  CHALLENGE: '/challenge',
  REFLECTION: '/reflection',
} as const;

export type PerspectiveCategory =
  | 'civic'
  | 'academic'
  | 'industry'
  | 'community'
  | 'ethics'
  | 'workforce';

export interface PerspectiveMetadata {
  id: PerspectiveCategory;
  label: string;
  description: string;
  colorVar: string;
  bgVar: string;
  borderVar: string;
}

export const PERSPECTIVE_CATEGORIES: Record<PerspectiveCategory, PerspectiveMetadata> = {
  civic: {
    id: 'civic',
    label: 'Civic & Regulatory',
    description: 'Focuses on governance, public policy, consumer rights, and legal frameworks.',
    colorVar: 'var(--perspective-civic)',
    bgVar: 'var(--perspective-civic-bg)',
    borderVar: 'var(--perspective-civic-border)',
  },
  academic: {
    id: 'academic',
    label: 'Academic & Research',
    description: 'Empirical studies, peer-reviewed data, scientific methodology, and longitudinal findings.',
    colorVar: 'var(--perspective-academic)',
    bgVar: 'var(--perspective-academic-bg)',
    borderVar: 'var(--perspective-academic-border)',
  },
  industry: {
    id: 'industry',
    label: 'Industry & Economic',
    description: 'Market innovation, business sustainability, capital investment, and product deployment.',
    colorVar: 'var(--perspective-industry)',
    bgVar: 'var(--perspective-industry-bg)',
    borderVar: 'var(--perspective-industry-border)',
  },
  community: {
    id: 'community',
    label: 'Community & Grassroots',
    description: 'Direct lived experiences, localized impact, marginalized communities, and cultural context.',
    colorVar: 'var(--perspective-community)',
    bgVar: 'var(--perspective-community-bg)',
    borderVar: 'var(--perspective-community-border)',
  },
  ethics: {
    id: 'ethics',
    label: 'Ethics & Philosophy',
    description: 'Moral implications, long-term societal values, existential considerations, and human agency.',
    colorVar: 'var(--perspective-ethics)',
    bgVar: 'var(--perspective-ethics-bg)',
    borderVar: 'var(--perspective-ethics-border)',
  },
  workforce: {
    id: 'workforce',
    label: 'Workforce & Labor',
    description: 'Employment conditions, wage stability, skill transitions, and frontline practitioner needs.',
    colorVar: 'var(--perspective-workforce)',
    bgVar: 'var(--perspective-workforce-bg)',
    borderVar: 'var(--perspective-workforce-border)',
  },
};

export const INITIAL_TOPICS = [
  {
    id: 'ai-jobs',
    name: 'AI & Jobs',
    description: 'How artificial intelligence may change work, skills and employment.',
    icon: 'Bot',
    tags: ['Automation', 'Labor Market', 'Reskilling', 'Future of Work'],
    perspectiveCount: 6,
    featured: true,
  },
  {
    id: 'climate-change',
    name: 'Climate Change',
    description: 'How different perspectives frame climate, policy and action.',
    icon: 'Globe',
    tags: ['Energy Transition', 'Policy & Subsidies', 'Environmental Justice', 'Economic Cost'],
    perspectiveCount: 6,
    featured: true,
  },
  {
    id: 'social-media-mental-health',
    name: 'Social Media & Mental Health',
    description: 'How different perspectives discuss social platforms and wellbeing.',
    icon: 'HeartPulse',
    tags: ['Algorithmic Feeds', 'Youth Wellbeing', 'Screen Time', 'Community Connection'],
    perspectiveCount: 6,
    featured: true,
  },
] as const;

export const CONTENT_FORMAT_OPTIONS = [
  {
    id: 'short-form-videos',
    label: 'Short-form videos',
    description: 'Bite-sized visual snippets, highlights, and quick commentary',
    iconName: 'Video',
  },
  {
    id: 'news-articles',
    label: 'News articles',
    description: 'Standard journalistic reporting and mainstream coverage',
    iconName: 'Newspaper',
  },
  {
    id: 'opinion-posts',
    label: 'Opinion posts',
    description: 'Commentaries, personal takes, and editorial columns',
    iconName: 'MessageSquare',
  },
  {
    id: 'educational-content',
    label: 'Educational content',
    description: 'Explainers, historical deep-dives, and tutorials',
    iconName: 'BookOpen',
  },
  {
    id: 'expert-research',
    label: 'Expert/research content',
    description: 'Academic studies, white papers, and empirical data analyses',
    iconName: 'FileText',
  },
] as const;

export const ATTENTION_TYPE_OPTIONS = [
  {
    id: 'strong-opinions',
    label: 'Strong opinions',
    description: 'High-conviction arguments, debates, and passionate stances',
    iconName: 'Zap',
  },
  {
    id: 'practical-advice',
    label: 'Practical advice',
    description: 'Actionable tips, career steps, and everyday guidance',
    iconName: 'CheckSquare',
  },
  {
    id: 'data-research',
    label: 'Data & research',
    description: 'Charts, statistics, peer-reviewed surveys, and metrics',
    iconName: 'BarChart3',
  },
  {
    id: 'personal-stories',
    label: 'Personal stories',
    description: 'Lived experiences, firsthand narratives, and human journeys',
    iconName: 'Users',
  },
  {
    id: 'breaking-news',
    label: 'Breaking news',
    description: 'Latest developments, headlines, and emerging updates',
    iconName: 'Radio',
  },
] as const;

export const SIMULATION_SESSION_KEY = 'btb_simulation_config';
