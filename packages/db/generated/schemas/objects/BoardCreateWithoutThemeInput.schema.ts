import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ChatroomCreateNestedManyWithoutBoardInputObjectSchema } from "./ChatroomCreateNestedManyWithoutBoardInput.schema";
import { InvitationCreateNestedManyWithoutBoardInputObjectSchema } from "./InvitationCreateNestedManyWithoutBoardInput.schema";
import { MemberCreateNestedManyWithoutBoardInputObjectSchema } from "./MemberCreateNestedManyWithoutBoardInput.schema";

const makeSchema = () =>
	z
		.object({
			name: z.string(),
			slug: z.string(),
			logo: z.string().optional().nullable(),
			isOfficial: z.boolean().optional(),
			createdAt: z.coerce.date(),
			metadata: z.string().optional(),
			members: z
				.lazy(() => MemberCreateNestedManyWithoutBoardInputObjectSchema)
				.optional(),
			invitations: z
				.lazy(() => InvitationCreateNestedManyWithoutBoardInputObjectSchema)
				.optional(),
			chatrooms: z
				.lazy(() => ChatroomCreateNestedManyWithoutBoardInputObjectSchema)
				.optional(),
		})
		.strict();
export const BoardCreateWithoutThemeInputObjectSchema: z.ZodType<Prisma.BoardCreateWithoutThemeInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BoardCreateWithoutThemeInput>;
export const BoardCreateWithoutThemeInputObjectZodSchema = makeSchema();
