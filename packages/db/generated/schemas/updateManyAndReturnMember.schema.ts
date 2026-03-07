import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { MemberSelectObjectSchema } from "./objects/MemberSelect.schema";
import { MemberUpdateManyMutationInputObjectSchema } from "./objects/MemberUpdateManyMutationInput.schema";
import { MemberWhereInputObjectSchema } from "./objects/MemberWhereInput.schema";

export const MemberUpdateManyAndReturnSchema: z.ZodType<Prisma.MemberUpdateManyAndReturnArgs> =
	z
		.object({
			select: MemberSelectObjectSchema.optional(),
			data: MemberUpdateManyMutationInputObjectSchema,
			where: MemberWhereInputObjectSchema.optional(),
		})
		.strict() as unknown as z.ZodType<Prisma.MemberUpdateManyAndReturnArgs>;

export const MemberUpdateManyAndReturnZodSchema = z
	.object({
		select: MemberSelectObjectSchema.optional(),
		data: MemberUpdateManyMutationInputObjectSchema,
		where: MemberWhereInputObjectSchema.optional(),
	})
	.strict();
