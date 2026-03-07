import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { InvitationWhereUniqueInputObjectSchema as InvitationWhereUniqueInputObjectSchema } from './InvitationWhereUniqueInput.schema';
import { InvitationUpdateWithoutBoardInputObjectSchema as InvitationUpdateWithoutBoardInputObjectSchema } from './InvitationUpdateWithoutBoardInput.schema';
import { InvitationUncheckedUpdateWithoutBoardInputObjectSchema as InvitationUncheckedUpdateWithoutBoardInputObjectSchema } from './InvitationUncheckedUpdateWithoutBoardInput.schema';
import { InvitationCreateWithoutBoardInputObjectSchema as InvitationCreateWithoutBoardInputObjectSchema } from './InvitationCreateWithoutBoardInput.schema';
import { InvitationUncheckedCreateWithoutBoardInputObjectSchema as InvitationUncheckedCreateWithoutBoardInputObjectSchema } from './InvitationUncheckedCreateWithoutBoardInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvitationWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => InvitationUpdateWithoutBoardInputObjectSchema), z.lazy(() => InvitationUncheckedUpdateWithoutBoardInputObjectSchema)]),
  create: z.union([z.lazy(() => InvitationCreateWithoutBoardInputObjectSchema), z.lazy(() => InvitationUncheckedCreateWithoutBoardInputObjectSchema)])
}).strict();
export const InvitationUpsertWithWhereUniqueWithoutBoardInputObjectSchema: z.ZodType<Prisma.InvitationUpsertWithWhereUniqueWithoutBoardInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationUpsertWithWhereUniqueWithoutBoardInput>;
export const InvitationUpsertWithWhereUniqueWithoutBoardInputObjectZodSchema = makeSchema();
