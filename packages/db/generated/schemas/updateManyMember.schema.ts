import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { MemberUpdateManyMutationInputObjectSchema } from "./objects/MemberUpdateManyMutationInput.schema";
import { MemberWhereInputObjectSchema } from "./objects/MemberWhereInput.schema";

export const MemberUpdateManySchema: z.ZodType<Prisma.MemberUpdateManyArgs> = z
	.object({
		data: MemberUpdateManyMutationInputObjectSchema,
		where: MemberWhereInputObjectSchema.optional(),
	})
	.strict() as unknown as z.ZodType<Prisma.MemberUpdateManyArgs>;

export const MemberUpdateManyZodSchema = z
	.object({
		data: MemberUpdateManyMutationInputObjectSchema,
		where: MemberWhereInputObjectSchema.optional(),
	})
	.strict();
