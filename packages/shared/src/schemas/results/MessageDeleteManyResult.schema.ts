import * as z from 'zod';
export const MessageDeleteManyResultSchema = z.object({
  count: z.number()
});