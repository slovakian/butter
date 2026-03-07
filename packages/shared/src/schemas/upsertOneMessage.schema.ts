import type { Prisma } from '../../../db/prisma/generated/client';
import * as z from 'zod';
import { MessageSelectObjectSchema as MessageSelectObjectSchema } from './objects/MessageSelect.schema';
import { MessageIncludeObjectSchema as MessageIncludeObjectSchema } from './objects/MessageInclude.schema';
import { MessageWhereUniqueInputObjectSchema as MessageWhereUniqueInputObjectSchema } from './objects/MessageWhereUniqueInput.schema';
import { MessageCreateInputObjectSchema as MessageCreateInputObjectSchema } from './objects/MessageCreateInput.schema';
import { MessageUncheckedCreateInputObjectSchema as MessageUncheckedCreateInputObjectSchema } from './objects/MessageUncheckedCreateInput.schema';
import { MessageUpdateInputObjectSchema as MessageUpdateInputObjectSchema } from './objects/MessageUpdateInput.schema';
import { MessageUncheckedUpdateInputObjectSchema as MessageUncheckedUpdateInputObjectSchema } from './objects/MessageUncheckedUpdateInput.schema';

export const MessageUpsertOneSchema: z.ZodType<Prisma.MessageUpsertArgs> = z.object({ select: MessageSelectObjectSchema.optional(), include: MessageIncludeObjectSchema.optional(), where: MessageWhereUniqueInputObjectSchema, create: z.union([ MessageCreateInputObjectSchema, MessageUncheckedCreateInputObjectSchema ]), update: z.union([ MessageUpdateInputObjectSchema, MessageUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.MessageUpsertArgs>;

export const MessageUpsertOneZodSchema = z.object({ select: MessageSelectObjectSchema.optional(), include: MessageIncludeObjectSchema.optional(), where: MessageWhereUniqueInputObjectSchema, create: z.union([ MessageCreateInputObjectSchema, MessageUncheckedCreateInputObjectSchema ]), update: z.union([ MessageUpdateInputObjectSchema, MessageUncheckedUpdateInputObjectSchema ]) }).strict();