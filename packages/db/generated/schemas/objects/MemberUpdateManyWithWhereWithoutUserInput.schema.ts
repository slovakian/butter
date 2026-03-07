import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { MemberScalarWhereInputObjectSchema as MemberScalarWhereInputObjectSchema } from './MemberScalarWhereInput.schema';
import { MemberUpdateManyMutationInputObjectSchema as MemberUpdateManyMutationInputObjectSchema } from './MemberUpdateManyMutationInput.schema';
import { MemberUncheckedUpdateManyWithoutUserInputObjectSchema as MemberUncheckedUpdateManyWithoutUserInputObjectSchema } from './MemberUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MemberScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => MemberUpdateManyMutationInputObjectSchema), z.lazy(() => MemberUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const MemberUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.MemberUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUpdateManyWithWhereWithoutUserInput>;
export const MemberUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
