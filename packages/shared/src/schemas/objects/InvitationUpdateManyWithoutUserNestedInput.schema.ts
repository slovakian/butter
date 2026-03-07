import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { InvitationCreateWithoutUserInputObjectSchema as InvitationCreateWithoutUserInputObjectSchema } from './InvitationCreateWithoutUserInput.schema';
import { InvitationUncheckedCreateWithoutUserInputObjectSchema as InvitationUncheckedCreateWithoutUserInputObjectSchema } from './InvitationUncheckedCreateWithoutUserInput.schema';
import { InvitationCreateOrConnectWithoutUserInputObjectSchema as InvitationCreateOrConnectWithoutUserInputObjectSchema } from './InvitationCreateOrConnectWithoutUserInput.schema';
import { InvitationUpsertWithWhereUniqueWithoutUserInputObjectSchema as InvitationUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './InvitationUpsertWithWhereUniqueWithoutUserInput.schema';
import { InvitationCreateManyUserInputEnvelopeObjectSchema as InvitationCreateManyUserInputEnvelopeObjectSchema } from './InvitationCreateManyUserInputEnvelope.schema';
import { InvitationWhereUniqueInputObjectSchema as InvitationWhereUniqueInputObjectSchema } from './InvitationWhereUniqueInput.schema';
import { InvitationUpdateWithWhereUniqueWithoutUserInputObjectSchema as InvitationUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './InvitationUpdateWithWhereUniqueWithoutUserInput.schema';
import { InvitationUpdateManyWithWhereWithoutUserInputObjectSchema as InvitationUpdateManyWithWhereWithoutUserInputObjectSchema } from './InvitationUpdateManyWithWhereWithoutUserInput.schema';
import { InvitationScalarWhereInputObjectSchema as InvitationScalarWhereInputObjectSchema } from './InvitationScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => InvitationCreateWithoutUserInputObjectSchema), z.lazy(() => InvitationCreateWithoutUserInputObjectSchema).array(), z.lazy(() => InvitationUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => InvitationUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => InvitationCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => InvitationCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => InvitationUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => InvitationUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => InvitationCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => InvitationWhereUniqueInputObjectSchema), z.lazy(() => InvitationWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => InvitationWhereUniqueInputObjectSchema), z.lazy(() => InvitationWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => InvitationWhereUniqueInputObjectSchema), z.lazy(() => InvitationWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => InvitationWhereUniqueInputObjectSchema), z.lazy(() => InvitationWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => InvitationUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => InvitationUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => InvitationUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => InvitationUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => InvitationScalarWhereInputObjectSchema), z.lazy(() => InvitationScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const InvitationUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.InvitationUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationUpdateManyWithoutUserNestedInput>;
export const InvitationUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
