import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ChatroomFindManySchema } from "../findManyChatroom.schema";
import { InvitationFindManySchema } from "../findManyInvitation.schema";
import { MemberFindManySchema } from "../findManyMember.schema";
import { BoardCountOutputTypeArgsObjectSchema } from "./BoardCountOutputTypeArgs.schema";
import { ThemeArgsObjectSchema } from "./ThemeArgs.schema";

const makeSchema = () =>
	z
		.object({
			members: z
				.union([z.boolean(), z.lazy(() => MemberFindManySchema)])
				.optional(),
			invitations: z
				.union([z.boolean(), z.lazy(() => InvitationFindManySchema)])
				.optional(),
			theme: z
				.union([z.boolean(), z.lazy(() => ThemeArgsObjectSchema)])
				.optional(),
			chatrooms: z
				.union([z.boolean(), z.lazy(() => ChatroomFindManySchema)])
				.optional(),
			_count: z
				.union([
					z.boolean(),
					z.lazy(() => BoardCountOutputTypeArgsObjectSchema),
				])
				.optional(),
		})
		.strict();
export const BoardIncludeObjectSchema: z.ZodType<Prisma.BoardInclude> =
	makeSchema() as unknown as z.ZodType<Prisma.BoardInclude>;
export const BoardIncludeObjectZodSchema = makeSchema();
