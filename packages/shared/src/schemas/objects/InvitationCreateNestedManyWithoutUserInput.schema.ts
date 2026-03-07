import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { InvitationCreateWithoutUserInputObjectSchema as InvitationCreateWithoutUserInputObjectSchema } from './InvitationCreateWithoutUserInput.schema';
import { InvitationUncheckedCreateWithoutUserInputObjectSchema as InvitationUncheckedCreateWithoutUserInputObjectSchema } from './InvitationUncheckedCreateWithoutUserInput.schema';
import { InvitationCreateOrConnectWithoutUserInputObjectSchema as InvitationCreateOrConnectWithoutUserInputObjectSchema } from './InvitationCreateOrConnectWithoutUserInput.schema';
import { InvitationCreateManyUserInputEnvelopeObjectSchema as InvitationCreateManyUserInputEnvelopeObjectSchema } from './InvitationCreateManyUserInputEnvelope.schema';
import { InvitationWhereUniqueInputObjectSchema as InvitationWhereUniqueInputObjectSchema } from './InvitationWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => InvitationCreateWithoutUserInputObjectSchema), z.lazy(() => InvitationCreateWithoutUserInputObjectSchema).array(), z.lazy(() => InvitationUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => InvitationUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => InvitationCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => InvitationCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => InvitationCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => InvitationWhereUniqueInputObjectSchema), z.lazy(() => InvitationWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const InvitationCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.InvitationCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationCreateNestedManyWithoutUserInput>;
export const InvitationCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
