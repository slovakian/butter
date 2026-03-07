import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { MessageScalarWhereInputObjectSchema as MessageScalarWhereInputObjectSchema } from './MessageScalarWhereInput.schema';
import { MessageUpdateManyMutationInputObjectSchema as MessageUpdateManyMutationInputObjectSchema } from './MessageUpdateManyMutationInput.schema';
import { MessageUncheckedUpdateManyWithoutChatroomInputObjectSchema as MessageUncheckedUpdateManyWithoutChatroomInputObjectSchema } from './MessageUncheckedUpdateManyWithoutChatroomInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MessageScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => MessageUpdateManyMutationInputObjectSchema), z.lazy(() => MessageUncheckedUpdateManyWithoutChatroomInputObjectSchema)])
}).strict();
export const MessageUpdateManyWithWhereWithoutChatroomInputObjectSchema: z.ZodType<Prisma.MessageUpdateManyWithWhereWithoutChatroomInput> = makeSchema() as unknown as z.ZodType<Prisma.MessageUpdateManyWithWhereWithoutChatroomInput>;
export const MessageUpdateManyWithWhereWithoutChatroomInputObjectZodSchema = makeSchema();
