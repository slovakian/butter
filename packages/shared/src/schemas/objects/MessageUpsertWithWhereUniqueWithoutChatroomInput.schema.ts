import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { MessageWhereUniqueInputObjectSchema as MessageWhereUniqueInputObjectSchema } from './MessageWhereUniqueInput.schema';
import { MessageUpdateWithoutChatroomInputObjectSchema as MessageUpdateWithoutChatroomInputObjectSchema } from './MessageUpdateWithoutChatroomInput.schema';
import { MessageUncheckedUpdateWithoutChatroomInputObjectSchema as MessageUncheckedUpdateWithoutChatroomInputObjectSchema } from './MessageUncheckedUpdateWithoutChatroomInput.schema';
import { MessageCreateWithoutChatroomInputObjectSchema as MessageCreateWithoutChatroomInputObjectSchema } from './MessageCreateWithoutChatroomInput.schema';
import { MessageUncheckedCreateWithoutChatroomInputObjectSchema as MessageUncheckedCreateWithoutChatroomInputObjectSchema } from './MessageUncheckedCreateWithoutChatroomInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MessageWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => MessageUpdateWithoutChatroomInputObjectSchema), z.lazy(() => MessageUncheckedUpdateWithoutChatroomInputObjectSchema)]),
  create: z.union([z.lazy(() => MessageCreateWithoutChatroomInputObjectSchema), z.lazy(() => MessageUncheckedCreateWithoutChatroomInputObjectSchema)])
}).strict();
export const MessageUpsertWithWhereUniqueWithoutChatroomInputObjectSchema: z.ZodType<Prisma.MessageUpsertWithWhereUniqueWithoutChatroomInput> = makeSchema() as unknown as z.ZodType<Prisma.MessageUpsertWithWhereUniqueWithoutChatroomInput>;
export const MessageUpsertWithWhereUniqueWithoutChatroomInputObjectZodSchema = makeSchema();
