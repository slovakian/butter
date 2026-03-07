import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './MemberWhereUniqueInput.schema';
import { MemberCreateWithoutBoardInputObjectSchema as MemberCreateWithoutBoardInputObjectSchema } from './MemberCreateWithoutBoardInput.schema';
import { MemberUncheckedCreateWithoutBoardInputObjectSchema as MemberUncheckedCreateWithoutBoardInputObjectSchema } from './MemberUncheckedCreateWithoutBoardInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MemberWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => MemberCreateWithoutBoardInputObjectSchema), z.lazy(() => MemberUncheckedCreateWithoutBoardInputObjectSchema)])
}).strict();
export const MemberCreateOrConnectWithoutBoardInputObjectSchema: z.ZodType<Prisma.MemberCreateOrConnectWithoutBoardInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberCreateOrConnectWithoutBoardInput>;
export const MemberCreateOrConnectWithoutBoardInputObjectZodSchema = makeSchema();
