import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoardArgsObjectSchema } from "./BoardArgs.schema";
import { UserArgsObjectSchema } from "./UserArgs.schema";

const makeSchema = () =>
	z
		.object({
			id: z.boolean().optional(),
			boardId: z.boolean().optional(),
			board: z
				.union([z.boolean(), z.lazy(() => BoardArgsObjectSchema)])
				.optional(),
			email: z.boolean().optional(),
			role: z.boolean().optional(),
			status: z.boolean().optional(),
			expiresAt: z.boolean().optional(),
			createdAt: z.boolean().optional(),
			inviterId: z.boolean().optional(),
			user: z
				.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)])
				.optional(),
		})
		.strict();
export const InvitationSelectObjectSchema: z.ZodType<Prisma.InvitationSelect> =
	makeSchema() as unknown as z.ZodType<Prisma.InvitationSelect>;
export const InvitationSelectObjectZodSchema = makeSchema();
