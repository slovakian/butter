import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { InvitationUncheckedCreateNestedManyWithoutBoardInputObjectSchema } from "./InvitationUncheckedCreateNestedManyWithoutBoardInput.schema";
import { MemberUncheckedCreateNestedManyWithoutBoardInputObjectSchema } from "./MemberUncheckedCreateNestedManyWithoutBoardInput.schema";

const makeSchema = () =>
	z
		.object({
			id: z.number().int().optional(),
			name: z.string(),
			slug: z.string(),
			logo: z.string().optional().nullable(),
			isOfficial: z.boolean().optional(),
			createdAt: z.coerce.date(),
			metadata: z.string().optional(),
			themeId: z.number().int().optional().nullable(),
			members: z
				.lazy(
					() => MemberUncheckedCreateNestedManyWithoutBoardInputObjectSchema,
				)
				.optional(),
			invitations: z
				.lazy(
					() =>
						InvitationUncheckedCreateNestedManyWithoutBoardInputObjectSchema,
				)
				.optional(),
		})
		.strict();
export const BoardUncheckedCreateWithoutChatroomsInputObjectSchema: z.ZodType<Prisma.BoardUncheckedCreateWithoutChatroomsInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BoardUncheckedCreateWithoutChatroomsInput>;
export const BoardUncheckedCreateWithoutChatroomsInputObjectZodSchema =
	makeSchema();
