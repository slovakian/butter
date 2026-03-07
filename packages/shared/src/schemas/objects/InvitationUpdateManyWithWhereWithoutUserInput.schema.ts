import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { InvitationScalarWhereInputObjectSchema as InvitationScalarWhereInputObjectSchema } from './InvitationScalarWhereInput.schema';
import { InvitationUpdateManyMutationInputObjectSchema as InvitationUpdateManyMutationInputObjectSchema } from './InvitationUpdateManyMutationInput.schema';
import { InvitationUncheckedUpdateManyWithoutUserInputObjectSchema as InvitationUncheckedUpdateManyWithoutUserInputObjectSchema } from './InvitationUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvitationScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => InvitationUpdateManyMutationInputObjectSchema), z.lazy(() => InvitationUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const InvitationUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.InvitationUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationUpdateManyWithWhereWithoutUserInput>;
export const InvitationUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
