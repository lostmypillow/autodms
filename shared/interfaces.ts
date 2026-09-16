// src/core/interfaces.ts
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