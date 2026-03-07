import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { InvitationCreateInputObjectSchema } from "./objects/InvitationCreateInput.schema";
import { InvitationIncludeObjectSchema } from "./objects/InvitationInclude.schema";
import { InvitationSelectObjectSchema } from "./objects/InvitationSelect.schema";
import { InvitationUncheckedCreateInputObjectSchema } from "./objects/InvitationUncheckedCreateInput.schema";

export const InvitationCreateOneSchema: z.ZodType<Prisma.InvitationCreateArgs> =
	z
		.object({
			select: InvitationSelectObjectSchema.optional(),
			include: InvitationIncludeObjectSchema.optional(),
			data: z.union([
				InvitationCreateInputObjectSchema,
				InvitationUncheckedCreateInputObjectSchema,
			]),
		})
		.strict() as unknown as z.ZodType<Prisma.InvitationCreateArgs>;

export const InvitationCreateOneZodSchema = z
	.object({
		select: InvitationSelectObjectSchema.optional(),
		include: InvitationIncludeObjectSchema.optional(),
		data: z.union([
			InvitationCreateInputObjectSchema,
			InvitationUncheckedCreateInputObjectSchema,
		]),
	})
	.strict();
