import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { ThemeWhereUniqueInputObjectSchema as ThemeWhereUniqueInputObjectSchema } from './ThemeWhereUniqueInput.schema';
import { ThemeCreateWithoutUserInputObjectSchema as ThemeCreateWithoutUserInputObjectSchema } from './ThemeCreateWithoutUserInput.schema';
import { ThemeUncheckedCreateWithoutUserInputObjectSchema as ThemeUncheckedCreateWithoutUserInputObjectSchema } from './ThemeUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ThemeWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ThemeCreateWithoutUserInputObjectSchema), z.lazy(() => ThemeUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const ThemeCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.ThemeCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ThemeCreateOrConnectWithoutUserInput>;
export const ThemeCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
