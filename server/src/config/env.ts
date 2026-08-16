import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  MONGODB_URI: z.string().optional(),
  GEMINI_API_KEY: z.string().optional(),
  APP_URL: z.string().default('http://localhost:3000'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Environment configuration validation error:', parsed.error.format());
}

export const env = parsed.success
  ? parsed.data
  : {
      PORT: Number(process.env.PORT) || 3000,
      NODE_ENV: (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development',
      MONGODB_URI: process.env.MONGODB_URI,
      GEMINI_API_KEY: process.env.GEMINI_API_KEY,
      APP_URL: process.env.APP_URL || 'http://localhost:3000',
    };
