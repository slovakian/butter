import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { BoardScalarWhereInputObjectSchema as BoardScalarWhereInputObjectSchema } from './BoardScalarWhereInput.schema';
import { BoardUpdateManyMutationInputObjectSchema as BoardUpdateManyMutationInputObjectSchema } from './BoardUpdateManyMutationInput.schema';
import { BoardUncheckedUpdateManyWithoutThemeInputObjectSchema as BoardUncheckedUpdateManyWithoutThemeInputObjectSchema } from './BoardUncheckedUpdateManyWithoutThemeInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => BoardScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => BoardUpdateManyMutationInputObjectSchema), z.lazy(() => BoardUncheckedUpdateManyWithoutThemeInputObjectSchema)])
}).strict();
export const BoardUpdateManyWithWhereWithoutThemeInputObjectSchema: z.ZodType<Prisma.BoardUpdateManyWithWhereWithoutThemeInput> = makeSchema() as unknown as z.ZodType<Prisma.BoardUpdateManyWithWhereWithoutThemeInput>;
export const BoardUpdateManyWithWhereWithoutThemeInputObjectZodSchema = makeSchema();
