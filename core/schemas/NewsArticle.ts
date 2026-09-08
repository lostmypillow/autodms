import { z } from 'zod';

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

export type NewsArticleAddition = z.infer<typeof NewsArticleAdditionSchema>;
