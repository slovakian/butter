import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './MemberWhereUniqueInput.schema';
import { MemberUpdateWithoutUserInputObjectSchema as MemberUpdateWithoutUserInputObjectSchema } from './MemberUpdateWithoutUserInput.schema';
import { MemberUncheckedUpdateWithoutUserInputObjectSchema as MemberUncheckedUpdateWithoutUserInputObjectSchema } from './MemberUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MemberWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => MemberUpdateWithoutUserInputObjectSchema), z.lazy(() => MemberUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const MemberUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.MemberUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUpdateWithWhereUniqueWithoutUserInput>;
export const MemberUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
