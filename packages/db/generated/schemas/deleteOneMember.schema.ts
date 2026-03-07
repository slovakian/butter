import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { MemberIncludeObjectSchema } from "./objects/MemberInclude.schema";
import { MemberSelectObjectSchema } from "./objects/MemberSelect.schema";
import { MemberWhereUniqueInputObjectSchema } from "./objects/MemberWhereUniqueInput.schema";

export const MemberDeleteOneSchema: z.ZodType<Prisma.MemberDeleteArgs> = z
	.object({
		select: MemberSelectObjectSchema.optional(),
		include: MemberIncludeObjectSchema.optional(),
		where: MemberWhereUniqueInputObjectSchema,
	})
	.strict() as unknown as z.ZodType<Prisma.MemberDeleteArgs>;

export const MemberDeleteOneZodSchema = z
	.object({
		select: MemberSelectObjectSchema.optional(),
		include: MemberIncludeObjectSchema.optional(),
		where: MemberWhereUniqueInputObjectSchema,
	})
	.strict();
