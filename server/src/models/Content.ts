import mongoose, { Schema, Document } from 'mongoose';
import type { SimulatedContentItem } from '../../../shared/types.js';

export interface ContentDocument extends Omit<SimulatedContentItem, 'id'>, Document {
  id: string;
}

const ContentSchema = new Schema<ContentDocument>(
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
      required: true,
      trim: true,
      index: true,
    },
    headline: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    perspective: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    sourceType: {
      type: String,
      required: true,
      trim: true,
    },
    sourceName: {
      type: String,
      required: true,
      trim: true,
    },
    framing: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    isSimulated: {
      type: Boolean,
      required: true,
      default: true,
    },
    format: {
      type: String,
      required: true,
      default: 'news-articles',
    },
    attentionType: {
      type: String,
      required: true,
      default: 'data-research',
    },
    readingTimeMinutes: {
      type: Number,
      default: 3,
    },
    authorTitle: {
      type: String,
      default: 'Simulated Contributor',
    },
    publishedDate: {
      type: String,
    },
    engagementScore: {
      type: Number,
      default: 85,
    },
  },
  {
    collection: 'content',
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

// Compound index for high performance topic & perspective querying
ContentSchema.index({ topicId: 1, perspective: 1 });
ContentSchema.index({ topicId: 1, format: 1 });

export const ContentModel =
  mongoose.models.Content || mongoose.model<ContentDocument>('Content', ContentSchema);
