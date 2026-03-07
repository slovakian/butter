import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { MemberCreateWithoutBoardInputObjectSchema as MemberCreateWithoutBoardInputObjectSchema } from './MemberCreateWithoutBoardInput.schema';
import { MemberUncheckedCreateWithoutBoardInputObjectSchema as MemberUncheckedCreateWithoutBoardInputObjectSchema } from './MemberUncheckedCreateWithoutBoardInput.schema';
import { MemberCreateOrConnectWithoutBoardInputObjectSchema as MemberCreateOrConnectWithoutBoardInputObjectSchema } from './MemberCreateOrConnectWithoutBoardInput.schema';
import { MemberUpsertWithWhereUniqueWithoutBoardInputObjectSchema as MemberUpsertWithWhereUniqueWithoutBoardInputObjectSchema } from './MemberUpsertWithWhereUniqueWithoutBoardInput.schema';
import { MemberCreateManyBoardInputEnvelopeObjectSchema as MemberCreateManyBoardInputEnvelopeObjectSchema } from './MemberCreateManyBoardInputEnvelope.schema';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './MemberWhereUniqueInput.schema';
import { MemberUpdateWithWhereUniqueWithoutBoardInputObjectSchema as MemberUpdateWithWhereUniqueWithoutBoardInputObjectSchema } from './MemberUpdateWithWhereUniqueWithoutBoardInput.schema';
import { MemberUpdateManyWithWhereWithoutBoardInputObjectSchema as MemberUpdateManyWithWhereWithoutBoardInputObjectSchema } from './MemberUpdateManyWithWhereWithoutBoardInput.schema';
import { MemberScalarWhereInputObjectSchema as MemberScalarWhereInputObjectSchema } from './MemberScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => MemberCreateWithoutBoardInputObjectSchema), z.lazy(() => MemberCreateWithoutBoardInputObjectSchema).array(), z.lazy(() => MemberUncheckedCreateWithoutBoardInputObjectSchema), z.lazy(() => MemberUncheckedCreateWithoutBoardInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => MemberCreateOrConnectWithoutBoardInputObjectSchema), z.lazy(() => MemberCreateOrConnectWithoutBoardInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => MemberUpsertWithWhereUniqueWithoutBoardInputObjectSchema), z.lazy(() => MemberUpsertWithWhereUniqueWithoutBoardInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => MemberCreateManyBoardInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => MemberWhereUniqueInputObjectSchema), z.lazy(() => MemberWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => MemberWhereUniqueInputObjectSchema), z.lazy(() => MemberWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => MemberWhereUniqueInputObjectSchema), z.lazy(() => MemberWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => MemberWhereUniqueInputObjectSchema), z.lazy(() => MemberWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => MemberUpdateWithWhereUniqueWithoutBoardInputObjectSchema), z.lazy(() => MemberUpdateWithWhereUniqueWithoutBoardInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => MemberUpdateManyWithWhereWithoutBoardInputObjectSchema), z.lazy(() => MemberUpdateManyWithWhereWithoutBoardInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => MemberScalarWhereInputObjectSchema), z.lazy(() => MemberScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const MemberUpdateManyWithoutBoardNestedInputObjectSchema: z.ZodType<Prisma.MemberUpdateManyWithoutBoardNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUpdateManyWithoutBoardNestedInput>;
export const MemberUpdateManyWithoutBoardNestedInputObjectZodSchema = makeSchema();
