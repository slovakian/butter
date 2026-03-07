import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { InvitationUpdateManyMutationInputObjectSchema } from "./objects/InvitationUpdateManyMutationInput.schema";
import { InvitationWhereInputObjectSchema } from "./objects/InvitationWhereInput.schema";

export const InvitationUpdateManySchema: z.ZodType<Prisma.InvitationUpdateManyArgs> =
	z
		.object({
			data: InvitationUpdateManyMutationInputObjectSchema,
			where: InvitationWhereInputObjectSchema.optional(),
		})
		.strict() as unknown as z.ZodType<Prisma.InvitationUpdateManyArgs>;

export const InvitationUpdateManyZodSchema = z
	.object({
		data: InvitationUpdateManyMutationInputObjectSchema,
		where: InvitationWhereInputObjectSchema.optional(),
	})
	.strict();
