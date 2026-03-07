import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { InvitationWhereUniqueInputObjectSchema as InvitationWhereUniqueInputObjectSchema } from './InvitationWhereUniqueInput.schema';
import { InvitationCreateWithoutUserInputObjectSchema as InvitationCreateWithoutUserInputObjectSchema } from './InvitationCreateWithoutUserInput.schema';
import { InvitationUncheckedCreateWithoutUserInputObjectSchema as InvitationUncheckedCreateWithoutUserInputObjectSchema } from './InvitationUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvitationWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => InvitationCreateWithoutUserInputObjectSchema), z.lazy(() => InvitationUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const InvitationCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.InvitationCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationCreateOrConnectWithoutUserInput>;
export const InvitationCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
