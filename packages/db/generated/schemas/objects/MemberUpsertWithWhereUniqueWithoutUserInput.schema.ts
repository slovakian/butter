import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './MemberWhereUniqueInput.schema';
import { MemberUpdateWithoutUserInputObjectSchema as MemberUpdateWithoutUserInputObjectSchema } from './MemberUpdateWithoutUserInput.schema';
import { MemberUncheckedUpdateWithoutUserInputObjectSchema as MemberUncheckedUpdateWithoutUserInputObjectSchema } from './MemberUncheckedUpdateWithoutUserInput.schema';
import { MemberCreateWithoutUserInputObjectSchema as MemberCreateWithoutUserInputObjectSchema } from './MemberCreateWithoutUserInput.schema';
import { MemberUncheckedCreateWithoutUserInputObjectSchema as MemberUncheckedCreateWithoutUserInputObjectSchema } from './MemberUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MemberWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => MemberUpdateWithoutUserInputObjectSchema), z.lazy(() => MemberUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => MemberCreateWithoutUserInputObjectSchema), z.lazy(() => MemberUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const MemberUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.MemberUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUpsertWithWhereUniqueWithoutUserInput>;
export const MemberUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
