import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { InvitationWhereUniqueInputObjectSchema as InvitationWhereUniqueInputObjectSchema } from './InvitationWhereUniqueInput.schema';
import { InvitationCreateWithoutBoardInputObjectSchema as InvitationCreateWithoutBoardInputObjectSchema } from './InvitationCreateWithoutBoardInput.schema';
import { InvitationUncheckedCreateWithoutBoardInputObjectSchema as InvitationUncheckedCreateWithoutBoardInputObjectSchema } from './InvitationUncheckedCreateWithoutBoardInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvitationWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => InvitationCreateWithoutBoardInputObjectSchema), z.lazy(() => InvitationUncheckedCreateWithoutBoardInputObjectSchema)])
}).strict();
export const InvitationCreateOrConnectWithoutBoardInputObjectSchema: z.ZodType<Prisma.InvitationCreateOrConnectWithoutBoardInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationCreateOrConnectWithoutBoardInput>;
export const InvitationCreateOrConnectWithoutBoardInputObjectZodSchema = makeSchema();
