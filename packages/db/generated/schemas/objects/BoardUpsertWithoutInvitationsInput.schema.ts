import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoardCreateWithoutInvitationsInputObjectSchema } from "./BoardCreateWithoutInvitationsInput.schema";
import { BoardUncheckedCreateWithoutInvitationsInputObjectSchema } from "./BoardUncheckedCreateWithoutInvitationsInput.schema";
import { BoardUncheckedUpdateWithoutInvitationsInputObjectSchema } from "./BoardUncheckedUpdateWithoutInvitationsInput.schema";
import { BoardUpdateWithoutInvitationsInputObjectSchema } from "./BoardUpdateWithoutInvitationsInput.schema";
import { BoardWhereInputObjectSchema } from "./BoardWhereInput.schema";

const makeSchema = () =>
	z
		.object({
			update: z.union([
				z.lazy(() => BoardUpdateWithoutInvitationsInputObjectSchema),
				z.lazy(() => BoardUncheckedUpdateWithoutInvitationsInputObjectSchema),
			]),
			create: z.union([
				z.lazy(() => BoardCreateWithoutInvitationsInputObjectSchema),
				z.lazy(() => BoardUncheckedCreateWithoutInvitationsInputObjectSchema),
			]),
			where: z.lazy(() => BoardWhereInputObjectSchema).optional(),
		})
		.strict();
export const BoardUpsertWithoutInvitationsInputObjectSchema: z.ZodType<Prisma.BoardUpsertWithoutInvitationsInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BoardUpsertWithoutInvitationsInput>;
export const BoardUpsertWithoutInvitationsInputObjectZodSchema = makeSchema();
