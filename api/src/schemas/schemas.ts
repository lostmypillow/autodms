import { z } from 'zod'

// Accepts ONLY { url }
export const UrlOnlySchema = z.strictObject({
    url: z.url(),
})

export const FullArticleSchema = UrlOnlySchema.extend({
    title: z.string().min(1),
    date: z.string(),
    author: z.string(),
    content: z.string(),
    source: z.string(),
    category: z.string(),
    englishSummaryTitle: z.string().optional(),
    englishSummaryContent: z.string().optional(),
    chineseSummaryTitle: z.string().optional(),
    chineseSummaryContent: z.string().optional(),
})

export const DbArticle = FullArticleSchema.extend({
    orderKey: z.string(),
})
export const NewsArticleAdditionSchema = z.union([
    FullArticleSchema,
    UrlOnlySchema,
])
export type NewsArticleAddition = z.infer<typeof NewsArticleAdditionSchema>
export type FullArticleAddition = z.infer<typeof FullArticleSchema>
export type DbArticleResult = z.infer<typeof DbArticle>
