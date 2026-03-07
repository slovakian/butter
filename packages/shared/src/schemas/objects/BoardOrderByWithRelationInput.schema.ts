import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { MemberOrderByRelationAggregateInputObjectSchema as MemberOrderByRelationAggregateInputObjectSchema } from './MemberOrderByRelationAggregateInput.schema';
import { InvitationOrderByRelationAggregateInputObjectSchema as InvitationOrderByRelationAggregateInputObjectSchema } from './InvitationOrderByRelationAggregateInput.schema';
import { ThemeOrderByWithRelationInputObjectSchema as ThemeOrderByWithRelationInputObjectSchema } from './ThemeOrderByWithRelationInput.schema';
import { ChatroomOrderByRelationAggregateInputObjectSchema as ChatroomOrderByRelationAggregateInputObjectSchema } from './ChatroomOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  slug: SortOrderSchema.optional(),
  logo: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  isOfficial: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  metadata: SortOrderSchema.optional(),
  themeId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  members: z.lazy(() => MemberOrderByRelationAggregateInputObjectSchema).optional(),
  invitations: z.lazy(() => InvitationOrderByRelationAggregateInputObjectSchema).optional(),
  theme: z.lazy(() => ThemeOrderByWithRelationInputObjectSchema).optional(),
  chatrooms: z.lazy(() => ChatroomOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const BoardOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.BoardOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.BoardOrderByWithRelationInput>;
export const BoardOrderByWithRelationInputObjectZodSchema = makeSchema();
