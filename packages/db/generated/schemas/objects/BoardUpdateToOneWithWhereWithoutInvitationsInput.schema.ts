import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { BoardWhereInputObjectSchema as BoardWhereInputObjectSchema } from './BoardWhereInput.schema';
import { BoardUpdateWithoutInvitationsInputObjectSchema as BoardUpdateWithoutInvitationsInputObjectSchema } from './BoardUpdateWithoutInvitationsInput.schema';
import { BoardUncheckedUpdateWithoutInvitationsInputObjectSchema as BoardUncheckedUpdateWithoutInvitationsInputObjectSchema } from './BoardUncheckedUpdateWithoutInvitationsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => BoardWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => BoardUpdateWithoutInvitationsInputObjectSchema), z.lazy(() => BoardUncheckedUpdateWithoutInvitationsInputObjectSchema)])
}).strict();
export const BoardUpdateToOneWithWhereWithoutInvitationsInputObjectSchema: z.ZodType<Prisma.BoardUpdateToOneWithWhereWithoutInvitationsInput> = makeSchema() as unknown as z.ZodType<Prisma.BoardUpdateToOneWithWhereWithoutInvitationsInput>;
export const BoardUpdateToOneWithWhereWithoutInvitationsInputObjectZodSchema = makeSchema();
