import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { MessageWhereUniqueInputObjectSchema as MessageWhereUniqueInputObjectSchema } from './MessageWhereUniqueInput.schema';
import { MessageUpdateWithoutUserInputObjectSchema as MessageUpdateWithoutUserInputObjectSchema } from './MessageUpdateWithoutUserInput.schema';
import { MessageUncheckedUpdateWithoutUserInputObjectSchema as MessageUncheckedUpdateWithoutUserInputObjectSchema } from './MessageUncheckedUpdateWithoutUserInput.schema';
import { MessageCreateWithoutUserInputObjectSchema as MessageCreateWithoutUserInputObjectSchema } from './MessageCreateWithoutUserInput.schema';
import { MessageUncheckedCreateWithoutUserInputObjectSchema as MessageUncheckedCreateWithoutUserInputObjectSchema } from './MessageUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MessageWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => MessageUpdateWithoutUserInputObjectSchema), z.lazy(() => MessageUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => MessageCreateWithoutUserInputObjectSchema), z.lazy(() => MessageUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const MessageUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.MessageUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.MessageUpsertWithWhereUniqueWithoutUserInput>;
export const MessageUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
