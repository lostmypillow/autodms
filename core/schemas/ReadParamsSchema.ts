import { z } from 'zod';

export const ReadParamsSchema = z.object({
  targetDate: z.iso.date(),
});

export type ReadParams = z.infer<typeof ReadParamsSchema>
