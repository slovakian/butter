import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { ThemeCreateWithoutBoardsUsingInputObjectSchema as ThemeCreateWithoutBoardsUsingInputObjectSchema } from './ThemeCreateWithoutBoardsUsingInput.schema';
import { ThemeUncheckedCreateWithoutBoardsUsingInputObjectSchema as ThemeUncheckedCreateWithoutBoardsUsingInputObjectSchema } from './ThemeUncheckedCreateWithoutBoardsUsingInput.schema';
import { ThemeCreateOrConnectWithoutBoardsUsingInputObjectSchema as ThemeCreateOrConnectWithoutBoardsUsingInputObjectSchema } from './ThemeCreateOrConnectWithoutBoardsUsingInput.schema';
import { ThemeWhereUniqueInputObjectSchema as ThemeWhereUniqueInputObjectSchema } from './ThemeWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ThemeCreateWithoutBoardsUsingInputObjectSchema), z.lazy(() => ThemeUncheckedCreateWithoutBoardsUsingInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ThemeCreateOrConnectWithoutBoardsUsingInputObjectSchema).optional(),
  connect: z.lazy(() => ThemeWhereUniqueInputObjectSchema).optional()
}).strict();
export const ThemeCreateNestedOneWithoutBoardsUsingInputObjectSchema: z.ZodType<Prisma.ThemeCreateNestedOneWithoutBoardsUsingInput> = makeSchema() as unknown as z.ZodType<Prisma.ThemeCreateNestedOneWithoutBoardsUsingInput>;
export const ThemeCreateNestedOneWithoutBoardsUsingInputObjectZodSchema = makeSchema();
