import type { Prisma } from '../../../db/prisma/generated/client';
import * as z from 'zod';
import { MessageUpdateManyMutationInputObjectSchema as MessageUpdateManyMutationInputObjectSchema } from './objects/MessageUpdateManyMutationInput.schema';
import { MessageWhereInputObjectSchema as MessageWhereInputObjectSchema } from './objects/MessageWhereInput.schema';

export const MessageUpdateManySchema: z.ZodType<Prisma.MessageUpdateManyArgs> = z.object({ data: MessageUpdateManyMutationInputObjectSchema, where: MessageWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.MessageUpdateManyArgs>;

export const MessageUpdateManyZodSchema = z.object({ data: MessageUpdateManyMutationInputObjectSchema, where: MessageWhereInputObjectSchema.optional() }).strict();