import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { InvitationWhereUniqueInputObjectSchema as InvitationWhereUniqueInputObjectSchema } from './InvitationWhereUniqueInput.schema';
import { InvitationUpdateWithoutUserInputObjectSchema as InvitationUpdateWithoutUserInputObjectSchema } from './InvitationUpdateWithoutUserInput.schema';
import { InvitationUncheckedUpdateWithoutUserInputObjectSchema as InvitationUncheckedUpdateWithoutUserInputObjectSchema } from './InvitationUncheckedUpdateWithoutUserInput.schema';
import { InvitationCreateWithoutUserInputObjectSchema as InvitationCreateWithoutUserInputObjectSchema } from './InvitationCreateWithoutUserInput.schema';
import { InvitationUncheckedCreateWithoutUserInputObjectSchema as InvitationUncheckedCreateWithoutUserInputObjectSchema } from './InvitationUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvitationWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => InvitationUpdateWithoutUserInputObjectSchema), z.lazy(() => InvitationUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => InvitationCreateWithoutUserInputObjectSchema), z.lazy(() => InvitationUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const InvitationUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.InvitationUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationUpsertWithWhereUniqueWithoutUserInput>;
export const InvitationUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
