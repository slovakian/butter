import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { InvitationWhereUniqueInputObjectSchema as InvitationWhereUniqueInputObjectSchema } from './InvitationWhereUniqueInput.schema';
import { InvitationUpdateWithoutBoardInputObjectSchema as InvitationUpdateWithoutBoardInputObjectSchema } from './InvitationUpdateWithoutBoardInput.schema';
import { InvitationUncheckedUpdateWithoutBoardInputObjectSchema as InvitationUncheckedUpdateWithoutBoardInputObjectSchema } from './InvitationUncheckedUpdateWithoutBoardInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvitationWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => InvitationUpdateWithoutBoardInputObjectSchema), z.lazy(() => InvitationUncheckedUpdateWithoutBoardInputObjectSchema)])
}).strict();
export const InvitationUpdateWithWhereUniqueWithoutBoardInputObjectSchema: z.ZodType<Prisma.InvitationUpdateWithWhereUniqueWithoutBoardInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationUpdateWithWhereUniqueWithoutBoardInput>;
export const InvitationUpdateWithWhereUniqueWithoutBoardInputObjectZodSchema = makeSchema();
