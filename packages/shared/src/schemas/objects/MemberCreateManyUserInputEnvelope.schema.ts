import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { MemberCreateManyUserInputObjectSchema as MemberCreateManyUserInputObjectSchema } from './MemberCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => MemberCreateManyUserInputObjectSchema), z.lazy(() => MemberCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const MemberCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.MemberCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.MemberCreateManyUserInputEnvelope>;
export const MemberCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
