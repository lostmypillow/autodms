import { z } from 'zod'

export const UpdateParamsSchema = z.object({
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
    url: z.url(),
    PK: z.string(),
    SK: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    orderKey: z.string()
})
export type UpdateParams = z.infer<typeof UpdateParamsSchema>
