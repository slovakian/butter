import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { InvitationSelectObjectSchema } from "./objects/InvitationSelect.schema";
import { InvitationUpdateManyMutationInputObjectSchema } from "./objects/InvitationUpdateManyMutationInput.schema";
import { InvitationWhereInputObjectSchema } from "./objects/InvitationWhereInput.schema";

export const InvitationUpdateManyAndReturnSchema: z.ZodType<Prisma.InvitationUpdateManyAndReturnArgs> =
	z
		.object({
			select: InvitationSelectObjectSchema.optional(),
			data: InvitationUpdateManyMutationInputObjectSchema,
			where: InvitationWhereInputObjectSchema.optional(),
		})
		.strict() as unknown as z.ZodType<Prisma.InvitationUpdateManyAndReturnArgs>;

export const InvitationUpdateManyAndReturnZodSchema = z
	.object({
		select: InvitationSelectObjectSchema.optional(),
		data: InvitationUpdateManyMutationInputObjectSchema,
		where: InvitationWhereInputObjectSchema.optional(),
	})
	.strict();
