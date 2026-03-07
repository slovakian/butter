import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { ThemeCreateManyUserInputObjectSchema as ThemeCreateManyUserInputObjectSchema } from './ThemeCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ThemeCreateManyUserInputObjectSchema), z.lazy(() => ThemeCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ThemeCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.ThemeCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ThemeCreateManyUserInputEnvelope>;
export const ThemeCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
