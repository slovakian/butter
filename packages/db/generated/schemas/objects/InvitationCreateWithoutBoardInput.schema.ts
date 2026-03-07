import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { UserCreateNestedOneWithoutInvitationsInputObjectSchema } from "./UserCreateNestedOneWithoutInvitationsInput.schema";

const makeSchema = () =>
	z
		.object({
			email: z.string(),
			role: z.string().optional().nullable(),
			status: z.string().optional(),
			expiresAt: z.coerce.date(),
			createdAt: z.coerce.date().optional(),
			user: z.lazy(
				() => UserCreateNestedOneWithoutInvitationsInputObjectSchema,
			),
		})
		.strict();
export const InvitationCreateWithoutBoardInputObjectSchema: z.ZodType<Prisma.InvitationCreateWithoutBoardInput> =
	makeSchema() as unknown as z.ZodType<Prisma.InvitationCreateWithoutBoardInput>;
export const InvitationCreateWithoutBoardInputObjectZodSchema = makeSchema();
