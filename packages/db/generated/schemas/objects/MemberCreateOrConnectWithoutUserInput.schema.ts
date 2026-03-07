import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './MemberWhereUniqueInput.schema';
import { MemberCreateWithoutUserInputObjectSchema as MemberCreateWithoutUserInputObjectSchema } from './MemberCreateWithoutUserInput.schema';
import { MemberUncheckedCreateWithoutUserInputObjectSchema as MemberUncheckedCreateWithoutUserInputObjectSchema } from './MemberUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MemberWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => MemberCreateWithoutUserInputObjectSchema), z.lazy(() => MemberUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const MemberCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.MemberCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberCreateOrConnectWithoutUserInput>;
export const MemberCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
