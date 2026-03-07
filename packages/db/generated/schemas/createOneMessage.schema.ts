import type { Prisma } from '../../prisma/generated/client';
import * as z from 'zod';
import { MessageSelectObjectSchema as MessageSelectObjectSchema } from './objects/MessageSelect.schema';
import { MessageIncludeObjectSchema as MessageIncludeObjectSchema } from './objects/MessageInclude.schema';
import { MessageCreateInputObjectSchema as MessageCreateInputObjectSchema } from './objects/MessageCreateInput.schema';
import { MessageUncheckedCreateInputObjectSchema as MessageUncheckedCreateInputObjectSchema } from './objects/MessageUncheckedCreateInput.schema';

export const MessageCreateOneSchema: z.ZodType<Prisma.MessageCreateArgs> = z.object({ select: MessageSelectObjectSchema.optional(), include: MessageIncludeObjectSchema.optional(), data: z.union([MessageCreateInputObjectSchema, MessageUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.MessageCreateArgs>;

export const MessageCreateOneZodSchema = z.object({ select: MessageSelectObjectSchema.optional(), include: MessageIncludeObjectSchema.optional(), data: z.union([MessageCreateInputObjectSchema, MessageUncheckedCreateInputObjectSchema]) }).strict();