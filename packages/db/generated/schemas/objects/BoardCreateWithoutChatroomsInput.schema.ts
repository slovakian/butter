import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { InvitationCreateNestedManyWithoutBoardInputObjectSchema } from "./InvitationCreateNestedManyWithoutBoardInput.schema";
import { MemberCreateNestedManyWithoutBoardInputObjectSchema } from "./MemberCreateNestedManyWithoutBoardInput.schema";
import { ThemeCreateNestedOneWithoutBoardsUsingInputObjectSchema } from "./ThemeCreateNestedOneWithoutBoardsUsingInput.schema";

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
			theme: z
				.lazy(() => ThemeCreateNestedOneWithoutBoardsUsingInputObjectSchema)
				.optional(),
		})
		.strict();
export const BoardCreateWithoutChatroomsInputObjectSchema: z.ZodType<Prisma.BoardCreateWithoutChatroomsInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BoardCreateWithoutChatroomsInput>;
export const BoardCreateWithoutChatroomsInputObjectZodSchema = makeSchema();
