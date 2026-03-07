import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { InvitationWhereUniqueInputObjectSchema as InvitationWhereUniqueInputObjectSchema } from './InvitationWhereUniqueInput.schema';
import { InvitationUpdateWithoutUserInputObjectSchema as InvitationUpdateWithoutUserInputObjectSchema } from './InvitationUpdateWithoutUserInput.schema';
import { InvitationUncheckedUpdateWithoutUserInputObjectSchema as InvitationUncheckedUpdateWithoutUserInputObjectSchema } from './InvitationUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvitationWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => InvitationUpdateWithoutUserInputObjectSchema), z.lazy(() => InvitationUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const InvitationUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.InvitationUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationUpdateWithWhereUniqueWithoutUserInput>;
export const InvitationUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
