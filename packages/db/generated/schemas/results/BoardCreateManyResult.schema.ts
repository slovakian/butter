import * as z from 'zod';
export const BoardCreateManyResultSchema = z.object({
  count: z.number()
});