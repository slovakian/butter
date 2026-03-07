import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './MemberWhereUniqueInput.schema';
import { MemberUpdateWithoutBoardInputObjectSchema as MemberUpdateWithoutBoardInputObjectSchema } from './MemberUpdateWithoutBoardInput.schema';
import { MemberUncheckedUpdateWithoutBoardInputObjectSchema as MemberUncheckedUpdateWithoutBoardInputObjectSchema } from './MemberUncheckedUpdateWithoutBoardInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MemberWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => MemberUpdateWithoutBoardInputObjectSchema), z.lazy(() => MemberUncheckedUpdateWithoutBoardInputObjectSchema)])
}).strict();
export const MemberUpdateWithWhereUniqueWithoutBoardInputObjectSchema: z.ZodType<Prisma.MemberUpdateWithWhereUniqueWithoutBoardInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUpdateWithWhereUniqueWithoutBoardInput>;
export const MemberUpdateWithWhereUniqueWithoutBoardInputObjectZodSchema = makeSchema();
