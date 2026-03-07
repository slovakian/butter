import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { MessageWhereUniqueInputObjectSchema as MessageWhereUniqueInputObjectSchema } from './MessageWhereUniqueInput.schema';
import { MessageUpdateWithoutUserInputObjectSchema as MessageUpdateWithoutUserInputObjectSchema } from './MessageUpdateWithoutUserInput.schema';
import { MessageUncheckedUpdateWithoutUserInputObjectSchema as MessageUncheckedUpdateWithoutUserInputObjectSchema } from './MessageUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MessageWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => MessageUpdateWithoutUserInputObjectSchema), z.lazy(() => MessageUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const MessageUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.MessageUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.MessageUpdateWithWhereUniqueWithoutUserInput>;
export const MessageUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
