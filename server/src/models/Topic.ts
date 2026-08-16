import mongoose, { Schema, Document } from 'mongoose';
import type { Topic as ITopic } from '../../../shared/types.js';

export interface TopicDocument extends Omit<ITopic, 'id'>, Document {
  id: string;
}

const TopicSchema = new Schema<TopicDocument>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    perspectiveCount: {
      type: Number,
      default: 6,
    },
    featured: {
      type: Boolean,
      default: true,
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
export const TopicModel =
  mongoose.models.Topic || mongoose.model<TopicDocument>('Topic', TopicSchema);
