import type { Prisma } from '../../../db/prisma/generated/client';
import * as z from 'zod';
import { InvitationWhereInputObjectSchema as InvitationWhereInputObjectSchema } from './objects/InvitationWhereInput.schema';

export const InvitationDeleteManySchema: z.ZodType<Prisma.InvitationDeleteManyArgs> = z.object({ where: InvitationWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.InvitationDeleteManyArgs>;

export const InvitationDeleteManyZodSchema = z.object({ where: InvitationWhereInputObjectSchema.optional() }).strict();