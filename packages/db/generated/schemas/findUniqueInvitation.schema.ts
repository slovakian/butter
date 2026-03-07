import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { InvitationIncludeObjectSchema } from "./objects/InvitationInclude.schema";
import { InvitationSelectObjectSchema } from "./objects/InvitationSelect.schema";
import { InvitationWhereUniqueInputObjectSchema } from "./objects/InvitationWhereUniqueInput.schema";

export const InvitationFindUniqueSchema: z.ZodType<Prisma.InvitationFindUniqueArgs> =
	z
		.object({
			select: InvitationSelectObjectSchema.optional(),
			include: InvitationIncludeObjectSchema.optional(),
			where: InvitationWhereUniqueInputObjectSchema,
		})
		.strict() as unknown as z.ZodType<Prisma.InvitationFindUniqueArgs>;

export const InvitationFindUniqueZodSchema = z
	.object({
		select: InvitationSelectObjectSchema.optional(),
		include: InvitationIncludeObjectSchema.optional(),
		where: InvitationWhereUniqueInputObjectSchema,
	})
	.strict();
