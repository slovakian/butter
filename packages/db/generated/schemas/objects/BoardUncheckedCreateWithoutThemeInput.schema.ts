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
export const BoardUncheckedCreateWithoutThemeInputObjectSchema: z.ZodType<Prisma.BoardUncheckedCreateWithoutThemeInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BoardUncheckedCreateWithoutThemeInput>;
export const BoardUncheckedCreateWithoutThemeInputObjectZodSchema =
	makeSchema();
