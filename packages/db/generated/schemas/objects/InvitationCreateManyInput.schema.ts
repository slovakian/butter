import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";

const makeSchema = () =>
	z
		.object({
			id: z.number().int().optional(),
			boardId: z.number().int(),
			email: z.string(),
			role: z.string().optional().nullable(),
			status: z.string().optional(),
			expiresAt: z.coerce.date(),
			createdAt: z.coerce.date().optional(),
			inviterId: z.number().int(),
		})
		.strict();
export const InvitationCreateManyInputObjectSchema: z.ZodType<Prisma.InvitationCreateManyInput> =
	makeSchema() as unknown as z.ZodType<Prisma.InvitationCreateManyInput>;
export const InvitationCreateManyInputObjectZodSchema = makeSchema();
