import mongoose from 'mongoose';
import { ChallengeModel } from '../models/Challenge.js';
import { INITIAL_CHALLENGES } from '../data/seedChallenges.js';
import type {
  ChallengeQuestion,
  GetChallengesResponse,
  SubmitChallengeRequest,
  ChallengeSubmissionResponse,
  ChallengeQuestionReview,
  ConceptResultItem,
  ChallengeConceptId,
} from '../../../shared/types.js';

export class ChallengeService {
  /**
   * Retrieves all media literacy challenge questions.
   * Auto-seeds MongoDB if empty, and falls back to robust local data if DB is offline.
   */
  public static async getChallenges(): Promise<GetChallengesResponse> {
    const isDbConnected = mongoose.connection.readyState === 1;

    if (!isDbConnected) {
      return {
        challenges: [...INITIAL_CHALLENGES],
        total: INITIAL_CHALLENGES.length,
        estimatedMinutes: '2–4 minutes',
        source: 'fallback',
      };
    }

    try {
      const dbChallenges = await ChallengeModel.find().sort({ order: 1 }).lean();

      if (dbChallenges && dbChallenges.length > 0) {
        const formatted: ChallengeQuestion[] = dbChallenges.map((doc: any) => ({
          id: doc.id,
          order: doc.order || 1,
          conceptId: doc.conceptId as ChallengeConceptId,
          conceptTitle: doc.conceptTitle,
          conceptBadge: doc.conceptBadge || 'Media Literacy',
          question: doc.question,
          supportingMaterial: doc.supportingMaterial,
          options: doc.options || [],
          correctAnswer: doc.correctAnswer,
          explanation: doc.explanation,
          difficulty: doc.difficulty || 'beginner',
        }));

        return {
          challenges: formatted,
          total: formatted.length,
          estimatedMinutes: '2–4 minutes',
          source: 'database',
        };
      }

      // If collection is empty, seed initial challenges into MongoDB
      console.log('🌱 Seeding initial Media Literacy Challenges into MongoDB...');
      await ChallengeModel.insertMany(INITIAL_CHALLENGES as any);

      return {
        challenges: [...INITIAL_CHALLENGES],
        total: INITIAL_CHALLENGES.length,
        estimatedMinutes: '2–4 minutes',
        source: 'database',
      };
    } catch (error) {
      console.warn('⚠️ Challenge database query encountered an issue. Providing fallback data:', error);
      return {
        challenges: [...INITIAL_CHALLENGES],
        total: INITIAL_CHALLENGES.length,
        estimatedMinutes: '2–4 minutes',
        source: 'fallback',
      };
    }
  }

  /**
   * Evaluates submitted challenge answers authoritatively on the server.
   * Never trusts client-computed scores or validation.
   */
  public static async submitChallenge(
    request: SubmitChallengeRequest
  ): Promise<ChallengeSubmissionResponse> {
    const { challenges } = await this.getChallenges();
    const userAnswers = request.answers || {};

    let correctAnswersCount = 0;
    const totalQuestions = challenges.length;

    const conceptMap: Record<ChallengeConceptId, { title: string; correct: boolean }> = {
      emotionalFraming: { title: 'Emotional Framing', correct: false },
      opinionVsEvidence: { title: 'Opinion vs Evidence', correct: false },
      sourceCredibility: { title: 'Source Credibility', correct: false },
      missingContext: { title: 'Missing Context', correct: false },
    };

    const reviews: ChallengeQuestionReview[] = challenges.map((challenge) => {
      const selectedOptionId = (userAnswers[challenge.id] || '').trim().toLowerCase();
      const isCorrect = selectedOptionId === challenge.correctAnswer.toLowerCase();

      if (isCorrect) {
        correctAnswersCount += 1;
        if (conceptMap[challenge.conceptId]) {
          conceptMap[challenge.conceptId].correct = true;
        }
      }

      const selectedOption = challenge.options.find(
        (opt) => opt.id.toLowerCase() === selectedOptionId
      );
      const correctOption = challenge.options.find(
        (opt) => opt.id.toLowerCase() === challenge.correctAnswer.toLowerCase()
      );

      return {
        questionId: challenge.id,
        order: challenge.order,
        conceptTitle: challenge.conceptTitle,
        conceptId: challenge.conceptId,
        question: challenge.question,
        selectedOptionId,
        correctOptionId: challenge.correctAnswer,
        isCorrect,
        selectedOptionText: selectedOption ? selectedOption.text : 'No answer selected',
        correctOptionText: correctOption ? correctOption.text : '',
        explanation: challenge.explanation,
        supportingMaterial: challenge.supportingMaterial,
      };
    });

    const score = totalQuestions > 0 ? Math.round((correctAnswersCount / totalQuestions) * 100) : 0;

    let ratingLabel = 'Foundational Signal Awareness';
    if (correctAnswersCount === 4) {
      ratingLabel = 'Master Signal Evaluator';
    } else if (correctAnswersCount === 3) {
      ratingLabel = 'Strong Signal Detection';
    } else if (correctAnswersCount === 2) {
      ratingLabel = 'Developing Signal Awareness';
    }

    const conceptResults: ConceptResultItem[] = Object.entries(conceptMap).map(
      ([key, val]) => ({
        conceptId: key as ChallengeConceptId,
        conceptTitle: val.title,
        identified: val.correct,
      })
    );

    const conceptsIdentified = conceptResults
      .filter((c) => c.identified)
      .map((c) => c.conceptTitle);

    const conceptsToRevisit = conceptResults
      .filter((c) => !c.identified)
      .map((c) => c.conceptTitle);

    return {
      score,
      totalQuestions,
      correctAnswersCount,
      ratingLabel,
      conceptBreakdown: {
        emotionalFraming: conceptMap.emotionalFraming.correct,
        opinionVsEvidence: conceptMap.opinionVsEvidence.correct,
        sourceCredibility: conceptMap.sourceCredibility.correct,
        missingContext: conceptMap.missingContext.correct,
      },
      conceptResults,
      conceptsIdentified,
      conceptsToRevisit,
      reviews,
      takeawayHabit: {
        heading: 'One useful habit to take with you:',
        habit: 'Before sharing a claim, ask:',
        prompt: 'What would I need to know to verify this?',
      },
      submittedAt: new Date().toISOString(),
    };
  }
}
