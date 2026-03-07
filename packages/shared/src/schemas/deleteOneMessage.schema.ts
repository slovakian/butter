import type { Prisma } from '../../../db/prisma/generated/client';
import * as z from 'zod';
import { MessageSelectObjectSchema as MessageSelectObjectSchema } from './objects/MessageSelect.schema';
import { MessageIncludeObjectSchema as MessageIncludeObjectSchema } from './objects/MessageInclude.schema';
import { MessageWhereUniqueInputObjectSchema as MessageWhereUniqueInputObjectSchema } from './objects/MessageWhereUniqueInput.schema';

export const MessageDeleteOneSchema: z.ZodType<Prisma.MessageDeleteArgs> = z.object({ select: MessageSelectObjectSchema.optional(), include: MessageIncludeObjectSchema.optional(), where: MessageWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.MessageDeleteArgs>;

export const MessageDeleteOneZodSchema = z.object({ select: MessageSelectObjectSchema.optional(), include: MessageIncludeObjectSchema.optional(), where: MessageWhereUniqueInputObjectSchema }).strict();