import type { Prisma } from '../../../db/prisma/generated/client';
import * as z from 'zod';
import { MessageSelectObjectSchema as MessageSelectObjectSchema } from './objects/MessageSelect.schema';
import { MessageCreateManyInputObjectSchema as MessageCreateManyInputObjectSchema } from './objects/MessageCreateManyInput.schema';

export const MessageCreateManyAndReturnSchema: z.ZodType<Prisma.MessageCreateManyAndReturnArgs> = z.object({ select: MessageSelectObjectSchema.optional(), data: z.union([ MessageCreateManyInputObjectSchema, z.array(MessageCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.MessageCreateManyAndReturnArgs>;

export const MessageCreateManyAndReturnZodSchema = z.object({ select: MessageSelectObjectSchema.optional(), data: z.union([ MessageCreateManyInputObjectSchema, z.array(MessageCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();