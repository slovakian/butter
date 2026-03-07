import * as z from 'zod';

export const UserSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  role: z.string().nullish(),
  banned: z.boolean().nullish(),
  banReason: z.string().nullish(),
  banExpires: z.date().nullish(),
  isAnonymous: z.boolean().nullish(),
});

export type UserType = z.infer<typeof UserSchema>;
