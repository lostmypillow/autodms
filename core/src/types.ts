export interface NewsArticle {
  title: string;
  date: string;
  author: string;
  content: string[];
  source: string;
}
export interface LinkSupportStatus {
  isSupported: boolean;
    needsExt: boolean;
}