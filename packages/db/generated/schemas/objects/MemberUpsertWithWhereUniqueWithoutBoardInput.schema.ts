import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './MemberWhereUniqueInput.schema';
import { MemberUpdateWithoutBoardInputObjectSchema as MemberUpdateWithoutBoardInputObjectSchema } from './MemberUpdateWithoutBoardInput.schema';
import { MemberUncheckedUpdateWithoutBoardInputObjectSchema as MemberUncheckedUpdateWithoutBoardInputObjectSchema } from './MemberUncheckedUpdateWithoutBoardInput.schema';
import { MemberCreateWithoutBoardInputObjectSchema as MemberCreateWithoutBoardInputObjectSchema } from './MemberCreateWithoutBoardInput.schema';
import { MemberUncheckedCreateWithoutBoardInputObjectSchema as MemberUncheckedCreateWithoutBoardInputObjectSchema } from './MemberUncheckedCreateWithoutBoardInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MemberWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => MemberUpdateWithoutBoardInputObjectSchema), z.lazy(() => MemberUncheckedUpdateWithoutBoardInputObjectSchema)]),
  create: z.union([z.lazy(() => MemberCreateWithoutBoardInputObjectSchema), z.lazy(() => MemberUncheckedCreateWithoutBoardInputObjectSchema)])
}).strict();
export const MemberUpsertWithWhereUniqueWithoutBoardInputObjectSchema: z.ZodType<Prisma.MemberUpsertWithWhereUniqueWithoutBoardInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUpsertWithWhereUniqueWithoutBoardInput>;
export const MemberUpsertWithWhereUniqueWithoutBoardInputObjectZodSchema = makeSchema();
