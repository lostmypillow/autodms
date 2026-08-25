import { z } from 'zod';

export const UpdateParamsSchema = z.object({
  title: z.string().optional(),
  date: z.string().optional(),
  author: z.string().optional(),
  content: z.string().optional(),
  source: z.string().optional(),
  category: z.string().optional(),
  url: z.url().optional()
});

export type UpdateParams = z.infer<typeof UpdateParamsSchema>
