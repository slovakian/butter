import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { MemberIncludeObjectSchema } from "./objects/MemberInclude.schema";
import { MemberSelectObjectSchema } from "./objects/MemberSelect.schema";
import { MemberUncheckedUpdateInputObjectSchema } from "./objects/MemberUncheckedUpdateInput.schema";
import { MemberUpdateInputObjectSchema } from "./objects/MemberUpdateInput.schema";
import { MemberWhereUniqueInputObjectSchema } from "./objects/MemberWhereUniqueInput.schema";

export const MemberUpdateOneSchema: z.ZodType<Prisma.MemberUpdateArgs> = z
	.object({
		select: MemberSelectObjectSchema.optional(),
		include: MemberIncludeObjectSchema.optional(),
		data: z.union([
			MemberUpdateInputObjectSchema,
			MemberUncheckedUpdateInputObjectSchema,
		]),
		where: MemberWhereUniqueInputObjectSchema,
	})
	.strict() as unknown as z.ZodType<Prisma.MemberUpdateArgs>;

export const MemberUpdateOneZodSchema = z
	.object({
		select: MemberSelectObjectSchema.optional(),
		include: MemberIncludeObjectSchema.optional(),
		data: z.union([
			MemberUpdateInputObjectSchema,
			MemberUncheckedUpdateInputObjectSchema,
		]),
		where: MemberWhereUniqueInputObjectSchema,
	})
	.strict();
