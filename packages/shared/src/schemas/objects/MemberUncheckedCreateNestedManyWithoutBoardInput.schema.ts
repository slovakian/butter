import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { MemberCreateWithoutBoardInputObjectSchema as MemberCreateWithoutBoardInputObjectSchema } from './MemberCreateWithoutBoardInput.schema';
import { MemberUncheckedCreateWithoutBoardInputObjectSchema as MemberUncheckedCreateWithoutBoardInputObjectSchema } from './MemberUncheckedCreateWithoutBoardInput.schema';
import { MemberCreateOrConnectWithoutBoardInputObjectSchema as MemberCreateOrConnectWithoutBoardInputObjectSchema } from './MemberCreateOrConnectWithoutBoardInput.schema';
import { MemberCreateManyBoardInputEnvelopeObjectSchema as MemberCreateManyBoardInputEnvelopeObjectSchema } from './MemberCreateManyBoardInputEnvelope.schema';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './MemberWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => MemberCreateWithoutBoardInputObjectSchema), z.lazy(() => MemberCreateWithoutBoardInputObjectSchema).array(), z.lazy(() => MemberUncheckedCreateWithoutBoardInputObjectSchema), z.lazy(() => MemberUncheckedCreateWithoutBoardInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => MemberCreateOrConnectWithoutBoardInputObjectSchema), z.lazy(() => MemberCreateOrConnectWithoutBoardInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => MemberCreateManyBoardInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => MemberWhereUniqueInputObjectSchema), z.lazy(() => MemberWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const MemberUncheckedCreateNestedManyWithoutBoardInputObjectSchema: z.ZodType<Prisma.MemberUncheckedCreateNestedManyWithoutBoardInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUncheckedCreateNestedManyWithoutBoardInput>;
export const MemberUncheckedCreateNestedManyWithoutBoardInputObjectZodSchema = makeSchema();
