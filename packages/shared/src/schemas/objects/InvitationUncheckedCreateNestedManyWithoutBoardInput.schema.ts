import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { InvitationCreateWithoutBoardInputObjectSchema as InvitationCreateWithoutBoardInputObjectSchema } from './InvitationCreateWithoutBoardInput.schema';
import { InvitationUncheckedCreateWithoutBoardInputObjectSchema as InvitationUncheckedCreateWithoutBoardInputObjectSchema } from './InvitationUncheckedCreateWithoutBoardInput.schema';
import { InvitationCreateOrConnectWithoutBoardInputObjectSchema as InvitationCreateOrConnectWithoutBoardInputObjectSchema } from './InvitationCreateOrConnectWithoutBoardInput.schema';
import { InvitationCreateManyBoardInputEnvelopeObjectSchema as InvitationCreateManyBoardInputEnvelopeObjectSchema } from './InvitationCreateManyBoardInputEnvelope.schema';
import { InvitationWhereUniqueInputObjectSchema as InvitationWhereUniqueInputObjectSchema } from './InvitationWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => InvitationCreateWithoutBoardInputObjectSchema), z.lazy(() => InvitationCreateWithoutBoardInputObjectSchema).array(), z.lazy(() => InvitationUncheckedCreateWithoutBoardInputObjectSchema), z.lazy(() => InvitationUncheckedCreateWithoutBoardInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => InvitationCreateOrConnectWithoutBoardInputObjectSchema), z.lazy(() => InvitationCreateOrConnectWithoutBoardInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => InvitationCreateManyBoardInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => InvitationWhereUniqueInputObjectSchema), z.lazy(() => InvitationWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const InvitationUncheckedCreateNestedManyWithoutBoardInputObjectSchema: z.ZodType<Prisma.InvitationUncheckedCreateNestedManyWithoutBoardInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationUncheckedCreateNestedManyWithoutBoardInput>;
export const InvitationUncheckedCreateNestedManyWithoutBoardInputObjectZodSchema = makeSchema();
