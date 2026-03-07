import * as z from 'zod';
export const BoardDeleteManyResultSchema = z.object({
  count: z.number()
});