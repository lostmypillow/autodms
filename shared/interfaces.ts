// src/core/interfaces.ts
import {expect} from "vitest";

export interface Item {
  id: string;
  content: string;
  createdAt: string;
}

export interface ItemRepository {
  createItem(item: Item): Promise<void>;
  getItem(id: string): Promise<Item | null>;
}
export interface NewsArticle {
  title: string;
  date: string;
  author: string;
  content: string[];
  source: string;
}
export interface NewsArticleAddition extends NewsArticle {
  category: string
  url: string
}
export interface LinkSupportStatus {
  isSupported: boolean;
  needsExt: boolean;
}

const nonEmptyString = expect.stringMatching(/.+/)
export const NewsArticleTestSchema = {
    title: nonEmptyString,
    date: nonEmptyString,
    author: nonEmptyString,
    content: nonEmptyString,
    source: nonEmptyString,
    category: nonEmptyString,
    url: nonEmptyString,
}