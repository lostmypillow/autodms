import { expect } from 'vitest';

export const NewsArticleTestSchema = {
  title: expect.any(String),
  date: expect.any(String),
  author: expect.any(String),
  content: expect.any(String),
  source: expect.any(String),
  category: expect.any(String),
  url: expect.any(String),
};
