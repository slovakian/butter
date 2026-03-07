import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { ThemeWhereUniqueInputObjectSchema as ThemeWhereUniqueInputObjectSchema } from './ThemeWhereUniqueInput.schema';
import { ThemeCreateWithoutBoardsUsingInputObjectSchema as ThemeCreateWithoutBoardsUsingInputObjectSchema } from './ThemeCreateWithoutBoardsUsingInput.schema';
import { ThemeUncheckedCreateWithoutBoardsUsingInputObjectSchema as ThemeUncheckedCreateWithoutBoardsUsingInputObjectSchema } from './ThemeUncheckedCreateWithoutBoardsUsingInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ThemeWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ThemeCreateWithoutBoardsUsingInputObjectSchema), z.lazy(() => ThemeUncheckedCreateWithoutBoardsUsingInputObjectSchema)])
}).strict();
export const ThemeCreateOrConnectWithoutBoardsUsingInputObjectSchema: z.ZodType<Prisma.ThemeCreateOrConnectWithoutBoardsUsingInput> = makeSchema() as unknown as z.ZodType<Prisma.ThemeCreateOrConnectWithoutBoardsUsingInput>;
export const ThemeCreateOrConnectWithoutBoardsUsingInputObjectZodSchema = makeSchema();
