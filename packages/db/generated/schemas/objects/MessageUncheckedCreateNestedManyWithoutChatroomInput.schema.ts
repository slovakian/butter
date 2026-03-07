import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { MessageCreateWithoutChatroomInputObjectSchema as MessageCreateWithoutChatroomInputObjectSchema } from './MessageCreateWithoutChatroomInput.schema';
import { MessageUncheckedCreateWithoutChatroomInputObjectSchema as MessageUncheckedCreateWithoutChatroomInputObjectSchema } from './MessageUncheckedCreateWithoutChatroomInput.schema';
import { MessageCreateOrConnectWithoutChatroomInputObjectSchema as MessageCreateOrConnectWithoutChatroomInputObjectSchema } from './MessageCreateOrConnectWithoutChatroomInput.schema';
import { MessageCreateManyChatroomInputEnvelopeObjectSchema as MessageCreateManyChatroomInputEnvelopeObjectSchema } from './MessageCreateManyChatroomInputEnvelope.schema';
import { MessageWhereUniqueInputObjectSchema as MessageWhereUniqueInputObjectSchema } from './MessageWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => MessageCreateWithoutChatroomInputObjectSchema), z.lazy(() => MessageCreateWithoutChatroomInputObjectSchema).array(), z.lazy(() => MessageUncheckedCreateWithoutChatroomInputObjectSchema), z.lazy(() => MessageUncheckedCreateWithoutChatroomInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => MessageCreateOrConnectWithoutChatroomInputObjectSchema), z.lazy(() => MessageCreateOrConnectWithoutChatroomInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => MessageCreateManyChatroomInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => MessageWhereUniqueInputObjectSchema), z.lazy(() => MessageWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const MessageUncheckedCreateNestedManyWithoutChatroomInputObjectSchema: z.ZodType<Prisma.MessageUncheckedCreateNestedManyWithoutChatroomInput> = makeSchema() as unknown as z.ZodType<Prisma.MessageUncheckedCreateNestedManyWithoutChatroomInput>;
export const MessageUncheckedCreateNestedManyWithoutChatroomInputObjectZodSchema = makeSchema();
