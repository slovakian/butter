import type { Prisma } from '../../../db/prisma/generated/client';
import * as z from 'zod';
import { MessageSelectObjectSchema as MessageSelectObjectSchema } from './objects/MessageSelect.schema';
import { MessageIncludeObjectSchema as MessageIncludeObjectSchema } from './objects/MessageInclude.schema';
import { MessageUpdateInputObjectSchema as MessageUpdateInputObjectSchema } from './objects/MessageUpdateInput.schema';
import { MessageUncheckedUpdateInputObjectSchema as MessageUncheckedUpdateInputObjectSchema } from './objects/MessageUncheckedUpdateInput.schema';
import { MessageWhereUniqueInputObjectSchema as MessageWhereUniqueInputObjectSchema } from './objects/MessageWhereUniqueInput.schema';

export const MessageUpdateOneSchema: z.ZodType<Prisma.MessageUpdateArgs> = z.object({ select: MessageSelectObjectSchema.optional(), include: MessageIncludeObjectSchema.optional(), data: z.union([MessageUpdateInputObjectSchema, MessageUncheckedUpdateInputObjectSchema]), where: MessageWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.MessageUpdateArgs>;

export const MessageUpdateOneZodSchema = z.object({ select: MessageSelectObjectSchema.optional(), include: MessageIncludeObjectSchema.optional(), data: z.union([MessageUpdateInputObjectSchema, MessageUncheckedUpdateInputObjectSchema]), where: MessageWhereUniqueInputObjectSchema }).strict();