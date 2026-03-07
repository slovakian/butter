import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { MemberCreateWithoutUserInputObjectSchema as MemberCreateWithoutUserInputObjectSchema } from './MemberCreateWithoutUserInput.schema';
import { MemberUncheckedCreateWithoutUserInputObjectSchema as MemberUncheckedCreateWithoutUserInputObjectSchema } from './MemberUncheckedCreateWithoutUserInput.schema';
import { MemberCreateOrConnectWithoutUserInputObjectSchema as MemberCreateOrConnectWithoutUserInputObjectSchema } from './MemberCreateOrConnectWithoutUserInput.schema';
import { MemberUpsertWithWhereUniqueWithoutUserInputObjectSchema as MemberUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './MemberUpsertWithWhereUniqueWithoutUserInput.schema';
import { MemberCreateManyUserInputEnvelopeObjectSchema as MemberCreateManyUserInputEnvelopeObjectSchema } from './MemberCreateManyUserInputEnvelope.schema';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './MemberWhereUniqueInput.schema';
import { MemberUpdateWithWhereUniqueWithoutUserInputObjectSchema as MemberUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './MemberUpdateWithWhereUniqueWithoutUserInput.schema';
import { MemberUpdateManyWithWhereWithoutUserInputObjectSchema as MemberUpdateManyWithWhereWithoutUserInputObjectSchema } from './MemberUpdateManyWithWhereWithoutUserInput.schema';
import { MemberScalarWhereInputObjectSchema as MemberScalarWhereInputObjectSchema } from './MemberScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => MemberCreateWithoutUserInputObjectSchema), z.lazy(() => MemberCreateWithoutUserInputObjectSchema).array(), z.lazy(() => MemberUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => MemberUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => MemberCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => MemberCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => MemberUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => MemberUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => MemberCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => MemberWhereUniqueInputObjectSchema), z.lazy(() => MemberWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => MemberWhereUniqueInputObjectSchema), z.lazy(() => MemberWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => MemberWhereUniqueInputObjectSchema), z.lazy(() => MemberWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => MemberWhereUniqueInputObjectSchema), z.lazy(() => MemberWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => MemberUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => MemberUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => MemberUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => MemberUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => MemberScalarWhereInputObjectSchema), z.lazy(() => MemberScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const MemberUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.MemberUncheckedUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUncheckedUpdateManyWithoutUserNestedInput>;
export const MemberUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
