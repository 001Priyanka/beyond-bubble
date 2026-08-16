/**
 * Shared Types for Beyond the Bubble
 * Shared across both frontend client and backend server.
 */

export interface HealthCheckResponse {
  status: 'ok' | 'degraded' | 'error';
  timestamp: string;
  uptimeSeconds: number;
  environment: string;
  database: {
    connected: boolean;
    state: 'disconnected' | 'connected' | 'connecting' | 'disconnecting' | 'unconfigured' | 'error';
    message?: string;
    lastError?: string;
  };
  version: string;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  icon: string;
  tags?: readonly string[] | string[];
  perspectiveCount?: number;
  featured?: boolean;
}

export type ContentFormatId =
  | 'short-form-videos'
  | 'news-articles'
  | 'opinion-posts'
  | 'educational-content'
  | 'expert-research';

export interface ContentFormatOption {
  id: ContentFormatId;
  label: string;
  description?: string;
  iconName?: string;
}

export type AttentionTypeId =
  | 'strong-opinions'
  | 'practical-advice'
  | 'data-research'
  | 'personal-stories'
  | 'breaking-news';

export interface AttentionTypeOption {
  id: AttentionTypeId;
  label: string;
  description?: string;
  iconName?: string;
}

export interface SimulationConfig {
  topicId: string;
  selectedContentFormats: ContentFormatId[] | string[];
  selectedAttentionTypes: AttentionTypeId[] | string[];
  createdAt: string;
}

export interface GetTopicsResponse {
  topics: Topic[];
  source: 'database' | 'fallback';
  total: number;
}

export interface SimulatedContentItem {
  id: string;
  topicId: string;
  headline: string;
  content: string;
  perspective: string;
  sourceType: string;
  sourceName: string;
  framing: string;
  tags: string[];
  isSimulated: boolean;
  format: ContentFormatId | string;
  attentionType: AttentionTypeId | string;
  readingTimeMinutes?: number;
  authorTitle?: string;
  publishedDate?: string;
  engagementScore?: number;
}

export interface SimulationFeedRequest {
  topicId: string;
  selectedContentFormats?: string[];
  selectedAttentionTypes?: string[];
}

export interface DistributionMetric {
  count: number;
  percentage: number;
}

export interface SimulationMetadata {
  isSimulated: boolean;
  topicId: string;
  topicName: string;
  contentCount: number;
  perspectiveDistribution: Record<string, DistributionMetric>;
  sourceDistribution: Record<string, DistributionMetric>;
  formatDistribution: Record<string, DistributionMetric>;
  attentionDistribution: Record<string, DistributionMetric>;
  generatedAt: string;
  source: 'database' | 'seed_repository';
}

export interface SimulationFeedResponse {
  simulationId: string;
  topic: Topic;
  feed: SimulatedContentItem[];
  simulationMetadata: SimulationMetadata;
}

export type DiversityInterpretationLabel =
  | 'Highly concentrated'
  | 'Moderately concentrated'
  | 'Relatively diverse'
  | 'Highly diverse';

export interface InterpretationDetails {
  label: DiversityInterpretationLabel;
  summary: string;
  range: '0–24' | '25–49' | '50–74' | '75–100';
  description: string;
}

export interface UnderrepresentedPerspective {
  perspective: string;
  count: number;
  proportion: number;
  percentage: number;
  description: string;
}

export interface DimensionBreakdown {
  score: number;
  rawEntropy: number;
  maxEntropy: number;
  categoriesRepresented: number;
  distribution: Record<string, number>; // proportions e.g. 0.60
  percentageDistribution: Record<string, number>; // percentages e.g. 60
}

export interface AnalysisRequest {
  simulationId: string;
  feed: SimulatedContentItem[];
}

export interface AnalysisResponse {
  simulationId: string;
  overallScore: number;
  viewpointScore: number;
  sourceScore: number;
  contentScore: number;
  perspectiveDistribution: Record<string, number>;
  sourceDistribution: Record<string, number>;
  contentDistribution: Record<string, number>;
  dominantPerspective: string;
  dominantPerspectivePercentage: number;
  underrepresentedPerspectives: UnderrepresentedPerspective[];
  interpretation: InterpretationDetails;
  itemCount: number;
  breakdown: {
    viewpoint: DimensionBreakdown;
    source: DimensionBreakdown;
    content: DimensionBreakdown;
  };
  calculatedAt: string;
}

// =========================================================================
// PHASE 7: PERSPECTIVE EXPLORER TYPES
// =========================================================================

export interface PerspectiveComparisonData {
  mainFocus: string;
  keyConcern: string;
  evidenceEmphasized: string;
  questionsRaised: string;
}

export interface PerspectiveDetail {
  id: string; // url-safe slug or name
  topicId: string;
  name: string;
  inquiryPrompt: string; // e.g., "How might someone in the workforce approach this question?"
  shortDescription: string;
  whyItMatters: string;
  overviewParagraphs: string[]; // 2-4 short paragraphs
  keyThemes: string[]; // 3-5 themes
  assumptions: string[]; // "WHAT DOES THIS PERSPECTIVE EMPHASIZE?"
  criticalQuestions: string[]; // "WHAT WOULD YOU WANT TO CHECK?"
  comparison: PerspectiveComparisonData;
  colorVar?: string;
  bgVar?: string;
}

export interface PerspectiveListItem {
  id: string;
  topicId: string;
  name: string;
  inquiryPrompt: string;
  shortDescription: string;
  whyItMatters: string;
  keyThemes: string[];
}

export interface GetPerspectivesResponse {
  topicId: string;
  perspectives: PerspectiveDetail[];
  total: number;
}

export interface GetPerspectiveDetailResponse {
  perspective: PerspectiveDetail;
  topic: Topic;
}

export interface GetPerspectiveContentResponse {
  topicId: string;
  perspective: string;
  items: SimulatedContentItem[];
  total: number;
}

export interface ExploredPerspectiveRecord {
  perspectiveName: string;
  exploredAt: string;
  topicId: string;
}

// =========================================================================
// PHASE 8: MEDIA LITERACY CHALLENGE TYPES
// =========================================================================

export type ChallengeConceptId =
  | 'emotionalFraming'
  | 'opinionVsEvidence'
  | 'sourceCredibility'
  | 'missingContext';

export interface ChallengeOption {
  id: string; // e.g. 'a', 'b', 'c', 'd', 'e'
  label: string; // e.g. 'A', 'B', 'C', 'D', 'E'
  text: string;
}

export interface SupportingMaterialHeadlines {
  type: 'headlines';
  headlineA: {
    label: string;
    text: string;
    source?: string;
  };
  headlineB: {
    label: string;
    text: string;
    source?: string;
  };
}

export interface SupportingMaterialStatement {
  type: 'statement';
  statement: string;
  attribution?: string;
}

export interface SupportingMaterialSourceComparison {
  type: 'source-comparison';
  sourceA: {
    name: string;
    tag: string;
    points: string[];
  };
  sourceB: {
    name: string;
    tag: string;
    points: string[];
  };
}

export interface SupportingMaterialStudyClaim {
  type: 'study-claim';
  claim: string;
  contextNote?: string;
}

export type ChallengeSupportingMaterial =
  | SupportingMaterialHeadlines
  | SupportingMaterialStatement
  | SupportingMaterialSourceComparison
  | SupportingMaterialStudyClaim;

export interface ChallengeQuestion {
  id: string;
  order: number;
  conceptId: ChallengeConceptId;
  conceptTitle: string;
  conceptBadge: string;
  question: string;
  supportingMaterial: ChallengeSupportingMaterial;
  options: ChallengeOption[];
  correctAnswer: string;
  explanation: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export interface GetChallengesResponse {
  challenges: ChallengeQuestion[];
  total: number;
  estimatedMinutes: string;
  source: 'database' | 'fallback';
}

export interface SubmitChallengeRequest {
  answers: Record<string, string>; // questionId -> selectedOptionId
  topicId?: string;
  sessionToken?: string;
}

export interface ConceptResultItem {
  conceptId: ChallengeConceptId;
  conceptTitle: string;
  identified: boolean;
}

export interface ChallengeQuestionReview {
  questionId: string;
  order: number;
  conceptTitle: string;
  conceptId: ChallengeConceptId;
  question: string;
  selectedOptionId: string;
  correctOptionId: string;
  isCorrect: boolean;
  selectedOptionText: string;
  correctOptionText: string;
  explanation: string;
  supportingMaterial: ChallengeSupportingMaterial;
}

export interface ChallengeSubmissionResponse {
  score: number; // 0 - 100
  totalQuestions: number;
  correctAnswersCount: number;
  ratingLabel: string;
  conceptBreakdown: {
    emotionalFraming: boolean;
    opinionVsEvidence: boolean;
    sourceCredibility: boolean;
    missingContext: boolean;
  };
  conceptResults: ConceptResultItem[];
  conceptsIdentified: string[];
  conceptsToRevisit: string[];
  reviews: ChallengeQuestionReview[];
  takeawayHabit: {
    heading: string;
    habit: string;
    prompt: string;
  };
  submittedAt: string;
}

// =========================================================================
// PHASE 9: REFLECTION & COMPLETE JOURNEY TYPES
// =========================================================================

export interface ReflectionAnswers {
  question1: string; // Action upon encountering strong claim
  question2: string; // What surprised most
  question3?: string; // Optional custom habit (max 300 chars)
}

export interface ReflectionQuestionOption {
  id: string;
  label: string;
}

export interface SessionJourneySummary {
  topicName: string;
  topicId: string;
  perspectivesEncountered: number;
  perspectivesExplored: number;
  challengeScore: number;
  challengeCorrectCount: number;
  challengeTotalCount: number;
  diversityScore?: number;
}

