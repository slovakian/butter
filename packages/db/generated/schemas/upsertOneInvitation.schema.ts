import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { InvitationCreateInputObjectSchema } from "./objects/InvitationCreateInput.schema";
import { InvitationIncludeObjectSchema } from "./objects/InvitationInclude.schema";
import { InvitationSelectObjectSchema } from "./objects/InvitationSelect.schema";
import { InvitationUncheckedCreateInputObjectSchema } from "./objects/InvitationUncheckedCreateInput.schema";
import { InvitationUncheckedUpdateInputObjectSchema } from "./objects/InvitationUncheckedUpdateInput.schema";
import { InvitationUpdateInputObjectSchema } from "./objects/InvitationUpdateInput.schema";
import { InvitationWhereUniqueInputObjectSchema } from "./objects/InvitationWhereUniqueInput.schema";

export const InvitationUpsertOneSchema: z.ZodType<Prisma.InvitationUpsertArgs> =
	z
		.object({
			select: InvitationSelectObjectSchema.optional(),
			include: InvitationIncludeObjectSchema.optional(),
			where: InvitationWhereUniqueInputObjectSchema,
			create: z.union([
				InvitationCreateInputObjectSchema,
				InvitationUncheckedCreateInputObjectSchema,
			]),
			update: z.union([
				InvitationUpdateInputObjectSchema,
				InvitationUncheckedUpdateInputObjectSchema,
			]),
		})
		.strict() as unknown as z.ZodType<Prisma.InvitationUpsertArgs>;

export const InvitationUpsertOneZodSchema = z
	.object({
		select: InvitationSelectObjectSchema.optional(),
		include: InvitationIncludeObjectSchema.optional(),
		where: InvitationWhereUniqueInputObjectSchema,
		create: z.union([
			InvitationCreateInputObjectSchema,
			InvitationUncheckedCreateInputObjectSchema,
		]),
		update: z.union([
			InvitationUpdateInputObjectSchema,
			InvitationUncheckedUpdateInputObjectSchema,
		]),
	})
	.strict();
