import { z } from 'zod';
import { expect } from 'vitest';

export const FullArticleSchema = z.object({
  title: z.string().min(1),
  date: z.string(),
  author: z.string(),
  content: z.string(),
  source: z.string(),
  category: z.string(),
  orderKey: z.string(),
  englishSummary: z.string().optional(),
  chineseSummary: z.string().optional(),
  url: z.url(),
});

// Accepts ONLY { url }
export const UrlOnlySchema = z.strictObject({
  url: z.url(),
});

export const NewsArticleAdditionSchema = z.union([FullArticleSchema, UrlOnlySchema]);
export const NewsArticleTestSchema = {
  title: expect.any(String),
  date: expect.any(String),
  author: expect.any(String),
  content: expect.any(String),
  source: expect.any(String),
  category: expect.any(String),
  url: expect.any(String),
};

export type NewsArticleAddition = z.infer<typeof NewsArticleAdditionSchema>;
