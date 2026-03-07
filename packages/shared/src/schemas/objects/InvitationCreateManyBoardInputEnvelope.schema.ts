import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { InvitationCreateManyBoardInputObjectSchema as InvitationCreateManyBoardInputObjectSchema } from './InvitationCreateManyBoardInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => InvitationCreateManyBoardInputObjectSchema), z.lazy(() => InvitationCreateManyBoardInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const InvitationCreateManyBoardInputEnvelopeObjectSchema: z.ZodType<Prisma.InvitationCreateManyBoardInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.InvitationCreateManyBoardInputEnvelope>;
export const InvitationCreateManyBoardInputEnvelopeObjectZodSchema = makeSchema();
