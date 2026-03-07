import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoardCreateNestedOneWithoutInvitationsInputObjectSchema } from "./BoardCreateNestedOneWithoutInvitationsInput.schema";
import { UserCreateNestedOneWithoutInvitationsInputObjectSchema } from "./UserCreateNestedOneWithoutInvitationsInput.schema";

const makeSchema = () =>
	z
		.object({
			email: z.string(),
			role: z.string().optional().nullable(),
			status: z.string().optional(),
			expiresAt: z.coerce.date(),
			createdAt: z.coerce.date().optional(),
			board: z.lazy(
				() => BoardCreateNestedOneWithoutInvitationsInputObjectSchema,
			),
			user: z.lazy(
				() => UserCreateNestedOneWithoutInvitationsInputObjectSchema,
			),
		})
		.strict();
export const InvitationCreateInputObjectSchema: z.ZodType<Prisma.InvitationCreateInput> =
	makeSchema() as unknown as z.ZodType<Prisma.InvitationCreateInput>;
export const InvitationCreateInputObjectZodSchema = makeSchema();
