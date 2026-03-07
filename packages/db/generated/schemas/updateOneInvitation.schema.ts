import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { InvitationIncludeObjectSchema } from "./objects/InvitationInclude.schema";
import { InvitationSelectObjectSchema } from "./objects/InvitationSelect.schema";
import { InvitationUncheckedUpdateInputObjectSchema } from "./objects/InvitationUncheckedUpdateInput.schema";
import { InvitationUpdateInputObjectSchema } from "./objects/InvitationUpdateInput.schema";
import { InvitationWhereUniqueInputObjectSchema } from "./objects/InvitationWhereUniqueInput.schema";

export const InvitationUpdateOneSchema: z.ZodType<Prisma.InvitationUpdateArgs> =
	z
		.object({
			select: InvitationSelectObjectSchema.optional(),
			include: InvitationIncludeObjectSchema.optional(),
			data: z.union([
				InvitationUpdateInputObjectSchema,
				InvitationUncheckedUpdateInputObjectSchema,
			]),
			where: InvitationWhereUniqueInputObjectSchema,
		})
		.strict() as unknown as z.ZodType<Prisma.InvitationUpdateArgs>;

export const InvitationUpdateOneZodSchema = z
	.object({
		select: InvitationSelectObjectSchema.optional(),
		include: InvitationIncludeObjectSchema.optional(),
		data: z.union([
			InvitationUpdateInputObjectSchema,
			InvitationUncheckedUpdateInputObjectSchema,
		]),
		where: InvitationWhereUniqueInputObjectSchema,
	})
	.strict();
