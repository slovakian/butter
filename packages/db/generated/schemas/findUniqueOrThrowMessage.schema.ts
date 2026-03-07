import type { Prisma } from '../../prisma/generated/client';
import * as z from 'zod';
import { MessageSelectObjectSchema as MessageSelectObjectSchema } from './objects/MessageSelect.schema';
import { MessageIncludeObjectSchema as MessageIncludeObjectSchema } from './objects/MessageInclude.schema';
import { MessageWhereUniqueInputObjectSchema as MessageWhereUniqueInputObjectSchema } from './objects/MessageWhereUniqueInput.schema';

export const MessageFindUniqueOrThrowSchema: z.ZodType<Prisma.MessageFindUniqueOrThrowArgs> = z.object({ select: MessageSelectObjectSchema.optional(), include: MessageIncludeObjectSchema.optional(), where: MessageWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.MessageFindUniqueOrThrowArgs>;

export const MessageFindUniqueOrThrowZodSchema = z.object({ select: MessageSelectObjectSchema.optional(), include: MessageIncludeObjectSchema.optional(), where: MessageWhereUniqueInputObjectSchema }).strict();