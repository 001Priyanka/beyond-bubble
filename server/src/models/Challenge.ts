import mongoose, { Schema, Document } from 'mongoose';
import type { ChallengeQuestion } from '../../../shared/types.js';

export interface ChallengeDocument extends Omit<ChallengeQuestion, 'id'>, Document {
  id: string;
  topicId?: string;
}

const ChallengeSchema = new Schema<ChallengeDocument>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    topicId: {
      type: String,
      trim: true,
      index: true,
    },
    order: {
      type: Number,
      default: 1,
      index: true,
    },
    conceptId: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    conceptTitle: {
      type: String,
      required: true,
      trim: true,
    },
    conceptBadge: {
      type: String,
      default: 'Media Literacy',
      trim: true,
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    supportingMaterial: {
      type: Schema.Types.Mixed,
      required: true,
    },
    options: [
      {
        id: { type: String, required: true },
        label: { type: String, required: true },
        text: { type: String, required: true },
      },
    ],
    correctAnswer: {
      type: String,
      required: true,
      trim: true,
    },
    explanation: {
      type: String,
      required: true,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret: any) => {
        delete ret._id;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
      },
    },
  }
);

// Prevent re-compiling model in dev/hot reload
export const ChallengeModel =
  (mongoose.models.Challenge as mongoose.Model<ChallengeDocument>) ||
  mongoose.model<ChallengeDocument>('Challenge', ChallengeSchema, 'challenges');
