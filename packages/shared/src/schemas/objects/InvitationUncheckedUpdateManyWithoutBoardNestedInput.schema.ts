import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { InvitationCreateWithoutBoardInputObjectSchema as InvitationCreateWithoutBoardInputObjectSchema } from './InvitationCreateWithoutBoardInput.schema';
import { InvitationUncheckedCreateWithoutBoardInputObjectSchema as InvitationUncheckedCreateWithoutBoardInputObjectSchema } from './InvitationUncheckedCreateWithoutBoardInput.schema';
import { InvitationCreateOrConnectWithoutBoardInputObjectSchema as InvitationCreateOrConnectWithoutBoardInputObjectSchema } from './InvitationCreateOrConnectWithoutBoardInput.schema';
import { InvitationUpsertWithWhereUniqueWithoutBoardInputObjectSchema as InvitationUpsertWithWhereUniqueWithoutBoardInputObjectSchema } from './InvitationUpsertWithWhereUniqueWithoutBoardInput.schema';
import { InvitationCreateManyBoardInputEnvelopeObjectSchema as InvitationCreateManyBoardInputEnvelopeObjectSchema } from './InvitationCreateManyBoardInputEnvelope.schema';
import { InvitationWhereUniqueInputObjectSchema as InvitationWhereUniqueInputObjectSchema } from './InvitationWhereUniqueInput.schema';
import { InvitationUpdateWithWhereUniqueWithoutBoardInputObjectSchema as InvitationUpdateWithWhereUniqueWithoutBoardInputObjectSchema } from './InvitationUpdateWithWhereUniqueWithoutBoardInput.schema';
import { InvitationUpdateManyWithWhereWithoutBoardInputObjectSchema as InvitationUpdateManyWithWhereWithoutBoardInputObjectSchema } from './InvitationUpdateManyWithWhereWithoutBoardInput.schema';
import { InvitationScalarWhereInputObjectSchema as InvitationScalarWhereInputObjectSchema } from './InvitationScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => InvitationCreateWithoutBoardInputObjectSchema), z.lazy(() => InvitationCreateWithoutBoardInputObjectSchema).array(), z.lazy(() => InvitationUncheckedCreateWithoutBoardInputObjectSchema), z.lazy(() => InvitationUncheckedCreateWithoutBoardInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => InvitationCreateOrConnectWithoutBoardInputObjectSchema), z.lazy(() => InvitationCreateOrConnectWithoutBoardInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => InvitationUpsertWithWhereUniqueWithoutBoardInputObjectSchema), z.lazy(() => InvitationUpsertWithWhereUniqueWithoutBoardInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => InvitationCreateManyBoardInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => InvitationWhereUniqueInputObjectSchema), z.lazy(() => InvitationWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => InvitationWhereUniqueInputObjectSchema), z.lazy(() => InvitationWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => InvitationWhereUniqueInputObjectSchema), z.lazy(() => InvitationWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => InvitationWhereUniqueInputObjectSchema), z.lazy(() => InvitationWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => InvitationUpdateWithWhereUniqueWithoutBoardInputObjectSchema), z.lazy(() => InvitationUpdateWithWhereUniqueWithoutBoardInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => InvitationUpdateManyWithWhereWithoutBoardInputObjectSchema), z.lazy(() => InvitationUpdateManyWithWhereWithoutBoardInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => InvitationScalarWhereInputObjectSchema), z.lazy(() => InvitationScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const InvitationUncheckedUpdateManyWithoutBoardNestedInputObjectSchema: z.ZodType<Prisma.InvitationUncheckedUpdateManyWithoutBoardNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationUncheckedUpdateManyWithoutBoardNestedInput>;
export const InvitationUncheckedUpdateManyWithoutBoardNestedInputObjectZodSchema = makeSchema();
