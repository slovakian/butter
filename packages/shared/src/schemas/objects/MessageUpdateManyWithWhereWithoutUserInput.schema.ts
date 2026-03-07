import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { MessageScalarWhereInputObjectSchema as MessageScalarWhereInputObjectSchema } from './MessageScalarWhereInput.schema';
import { MessageUpdateManyMutationInputObjectSchema as MessageUpdateManyMutationInputObjectSchema } from './MessageUpdateManyMutationInput.schema';
import { MessageUncheckedUpdateManyWithoutUserInputObjectSchema as MessageUncheckedUpdateManyWithoutUserInputObjectSchema } from './MessageUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MessageScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => MessageUpdateManyMutationInputObjectSchema), z.lazy(() => MessageUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const MessageUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.MessageUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.MessageUpdateManyWithWhereWithoutUserInput>;
export const MessageUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
