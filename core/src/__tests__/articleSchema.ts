import { expect } from 'vitest';

export const articleSchema = {
  title: expect.any(String),
  date: expect.any(String),
  author: expect.any(String),
  content: expect.any(String),
  source: expect.any(String),
};
