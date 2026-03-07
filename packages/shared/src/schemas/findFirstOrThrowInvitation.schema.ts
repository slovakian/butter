import type { Prisma } from '../../../db/prisma/generated/client';
import * as z from 'zod';
import { InvitationIncludeObjectSchema as InvitationIncludeObjectSchema } from './objects/InvitationInclude.schema';
import { InvitationOrderByWithRelationInputObjectSchema as InvitationOrderByWithRelationInputObjectSchema } from './objects/InvitationOrderByWithRelationInput.schema';
import { InvitationWhereInputObjectSchema as InvitationWhereInputObjectSchema } from './objects/InvitationWhereInput.schema';
import { InvitationWhereUniqueInputObjectSchema as InvitationWhereUniqueInputObjectSchema } from './objects/InvitationWhereUniqueInput.schema';
import { InvitationScalarFieldEnumSchema } from './enums/InvitationScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const InvitationFindFirstOrThrowSelectSchema: z.ZodType<Prisma.InvitationSelect> = z.object({
    id: z.boolean().optional(),
    boardId: z.boolean().optional(),
    board: z.boolean().optional(),
    email: z.boolean().optional(),
    role: z.boolean().optional(),
    status: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    inviterId: z.boolean().optional(),
    user: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.InvitationSelect>;

export const InvitationFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    boardId: z.boolean().optional(),
    board: z.boolean().optional(),
    email: z.boolean().optional(),
    role: z.boolean().optional(),
    status: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    inviterId: z.boolean().optional(),
    user: z.boolean().optional()
  }).strict();

export const InvitationFindFirstOrThrowSchema: z.ZodType<Prisma.InvitationFindFirstOrThrowArgs> = z.object({ select: InvitationFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => InvitationIncludeObjectSchema.optional()), orderBy: z.union([InvitationOrderByWithRelationInputObjectSchema, InvitationOrderByWithRelationInputObjectSchema.array()]).optional(), where: InvitationWhereInputObjectSchema.optional(), cursor: InvitationWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([InvitationScalarFieldEnumSchema, InvitationScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.InvitationFindFirstOrThrowArgs>;

export const InvitationFindFirstOrThrowZodSchema = z.object({ select: InvitationFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => InvitationIncludeObjectSchema.optional()), orderBy: z.union([InvitationOrderByWithRelationInputObjectSchema, InvitationOrderByWithRelationInputObjectSchema.array()]).optional(), where: InvitationWhereInputObjectSchema.optional(), cursor: InvitationWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([InvitationScalarFieldEnumSchema, InvitationScalarFieldEnumSchema.array()]).optional() }).strict();