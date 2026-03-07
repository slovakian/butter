import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { MessageWhereUniqueInputObjectSchema as MessageWhereUniqueInputObjectSchema } from './MessageWhereUniqueInput.schema';
import { MessageUpdateWithoutChatroomInputObjectSchema as MessageUpdateWithoutChatroomInputObjectSchema } from './MessageUpdateWithoutChatroomInput.schema';
import { MessageUncheckedUpdateWithoutChatroomInputObjectSchema as MessageUncheckedUpdateWithoutChatroomInputObjectSchema } from './MessageUncheckedUpdateWithoutChatroomInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MessageWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => MessageUpdateWithoutChatroomInputObjectSchema), z.lazy(() => MessageUncheckedUpdateWithoutChatroomInputObjectSchema)])
}).strict();
export const MessageUpdateWithWhereUniqueWithoutChatroomInputObjectSchema: z.ZodType<Prisma.MessageUpdateWithWhereUniqueWithoutChatroomInput> = makeSchema() as unknown as z.ZodType<Prisma.MessageUpdateWithWhereUniqueWithoutChatroomInput>;
export const MessageUpdateWithWhereUniqueWithoutChatroomInputObjectZodSchema = makeSchema();
