import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { InvitationCreateManyInputObjectSchema } from "./objects/InvitationCreateManyInput.schema";

export const InvitationCreateManySchema: z.ZodType<Prisma.InvitationCreateManyArgs> =
	z
		.object({
			data: z.union([
				InvitationCreateManyInputObjectSchema,
				z.array(InvitationCreateManyInputObjectSchema),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict() as unknown as z.ZodType<Prisma.InvitationCreateManyArgs>;

export const InvitationCreateManyZodSchema = z
	.object({
		data: z.union([
			InvitationCreateManyInputObjectSchema,
			z.array(InvitationCreateManyInputObjectSchema),
		]),
		skipDuplicates: z.boolean().optional(),
	})
	.strict();
