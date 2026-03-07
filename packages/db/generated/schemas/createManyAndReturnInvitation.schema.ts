import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { InvitationCreateManyInputObjectSchema } from "./objects/InvitationCreateManyInput.schema";
import { InvitationSelectObjectSchema } from "./objects/InvitationSelect.schema";

export const InvitationCreateManyAndReturnSchema: z.ZodType<Prisma.InvitationCreateManyAndReturnArgs> =
	z
		.object({
			select: InvitationSelectObjectSchema.optional(),
			data: z.union([
				InvitationCreateManyInputObjectSchema,
				z.array(InvitationCreateManyInputObjectSchema),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict() as unknown as z.ZodType<Prisma.InvitationCreateManyAndReturnArgs>;

export const InvitationCreateManyAndReturnZodSchema = z
	.object({
		select: InvitationSelectObjectSchema.optional(),
		data: z.union([
			InvitationCreateManyInputObjectSchema,
			z.array(InvitationCreateManyInputObjectSchema),
		]),
		skipDuplicates: z.boolean().optional(),
	})
	.strict();
