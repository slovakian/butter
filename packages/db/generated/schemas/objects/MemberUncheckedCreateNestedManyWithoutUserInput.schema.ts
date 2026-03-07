import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { MemberCreateWithoutUserInputObjectSchema as MemberCreateWithoutUserInputObjectSchema } from './MemberCreateWithoutUserInput.schema';
import { MemberUncheckedCreateWithoutUserInputObjectSchema as MemberUncheckedCreateWithoutUserInputObjectSchema } from './MemberUncheckedCreateWithoutUserInput.schema';
import { MemberCreateOrConnectWithoutUserInputObjectSchema as MemberCreateOrConnectWithoutUserInputObjectSchema } from './MemberCreateOrConnectWithoutUserInput.schema';
import { MemberCreateManyUserInputEnvelopeObjectSchema as MemberCreateManyUserInputEnvelopeObjectSchema } from './MemberCreateManyUserInputEnvelope.schema';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './MemberWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => MemberCreateWithoutUserInputObjectSchema), z.lazy(() => MemberCreateWithoutUserInputObjectSchema).array(), z.lazy(() => MemberUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => MemberUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => MemberCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => MemberCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => MemberCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => MemberWhereUniqueInputObjectSchema), z.lazy(() => MemberWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const MemberUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.MemberUncheckedCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUncheckedCreateNestedManyWithoutUserInput>;
export const MemberUncheckedCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
