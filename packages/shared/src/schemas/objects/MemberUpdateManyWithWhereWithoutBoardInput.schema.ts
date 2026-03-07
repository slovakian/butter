import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { MemberScalarWhereInputObjectSchema as MemberScalarWhereInputObjectSchema } from './MemberScalarWhereInput.schema';
import { MemberUpdateManyMutationInputObjectSchema as MemberUpdateManyMutationInputObjectSchema } from './MemberUpdateManyMutationInput.schema';
import { MemberUncheckedUpdateManyWithoutBoardInputObjectSchema as MemberUncheckedUpdateManyWithoutBoardInputObjectSchema } from './MemberUncheckedUpdateManyWithoutBoardInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MemberScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => MemberUpdateManyMutationInputObjectSchema), z.lazy(() => MemberUncheckedUpdateManyWithoutBoardInputObjectSchema)])
}).strict();
export const MemberUpdateManyWithWhereWithoutBoardInputObjectSchema: z.ZodType<Prisma.MemberUpdateManyWithWhereWithoutBoardInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUpdateManyWithWhereWithoutBoardInput>;
export const MemberUpdateManyWithWhereWithoutBoardInputObjectZodSchema = makeSchema();
