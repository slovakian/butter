import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ChatroomUncheckedCreateNestedManyWithoutBoardInputObjectSchema } from "./ChatroomUncheckedCreateNestedManyWithoutBoardInput.schema";
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
			chatrooms: z
				.lazy(
					() => ChatroomUncheckedCreateNestedManyWithoutBoardInputObjectSchema,
				)
				.optional(),
		})
		.strict();
export const BoardUncheckedCreateInputObjectSchema: z.ZodType<Prisma.BoardUncheckedCreateInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BoardUncheckedCreateInput>;
export const BoardUncheckedCreateInputObjectZodSchema = makeSchema();
