import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { MessageWhereUniqueInputObjectSchema as MessageWhereUniqueInputObjectSchema } from './MessageWhereUniqueInput.schema';
import { MessageCreateWithoutUserInputObjectSchema as MessageCreateWithoutUserInputObjectSchema } from './MessageCreateWithoutUserInput.schema';
import { MessageUncheckedCreateWithoutUserInputObjectSchema as MessageUncheckedCreateWithoutUserInputObjectSchema } from './MessageUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MessageWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => MessageCreateWithoutUserInputObjectSchema), z.lazy(() => MessageUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const MessageCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.MessageCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.MessageCreateOrConnectWithoutUserInput>;
export const MessageCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
