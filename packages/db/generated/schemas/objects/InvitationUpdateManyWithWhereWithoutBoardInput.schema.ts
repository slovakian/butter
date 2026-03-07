import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { InvitationScalarWhereInputObjectSchema as InvitationScalarWhereInputObjectSchema } from './InvitationScalarWhereInput.schema';
import { InvitationUpdateManyMutationInputObjectSchema as InvitationUpdateManyMutationInputObjectSchema } from './InvitationUpdateManyMutationInput.schema';
import { InvitationUncheckedUpdateManyWithoutBoardInputObjectSchema as InvitationUncheckedUpdateManyWithoutBoardInputObjectSchema } from './InvitationUncheckedUpdateManyWithoutBoardInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvitationScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => InvitationUpdateManyMutationInputObjectSchema), z.lazy(() => InvitationUncheckedUpdateManyWithoutBoardInputObjectSchema)])
}).strict();
export const InvitationUpdateManyWithWhereWithoutBoardInputObjectSchema: z.ZodType<Prisma.InvitationUpdateManyWithWhereWithoutBoardInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationUpdateManyWithWhereWithoutBoardInput>;
export const InvitationUpdateManyWithWhereWithoutBoardInputObjectZodSchema = makeSchema();
