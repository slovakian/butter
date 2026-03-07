import type { Prisma } from '../../prisma/generated/client';
import * as z from 'zod';
import { MessageSelectObjectSchema as MessageSelectObjectSchema } from './objects/MessageSelect.schema';
import { MessageUpdateManyMutationInputObjectSchema as MessageUpdateManyMutationInputObjectSchema } from './objects/MessageUpdateManyMutationInput.schema';
import { MessageWhereInputObjectSchema as MessageWhereInputObjectSchema } from './objects/MessageWhereInput.schema';

export const MessageUpdateManyAndReturnSchema: z.ZodType<Prisma.MessageUpdateManyAndReturnArgs> = z.object({ select: MessageSelectObjectSchema.optional(), data: MessageUpdateManyMutationInputObjectSchema, where: MessageWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.MessageUpdateManyAndReturnArgs>;

export const MessageUpdateManyAndReturnZodSchema = z.object({ select: MessageSelectObjectSchema.optional(), data: MessageUpdateManyMutationInputObjectSchema, where: MessageWhereInputObjectSchema.optional() }).strict();