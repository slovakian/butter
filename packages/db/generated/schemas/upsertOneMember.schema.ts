import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { MemberCreateInputObjectSchema } from "./objects/MemberCreateInput.schema";
import { MemberIncludeObjectSchema } from "./objects/MemberInclude.schema";
import { MemberSelectObjectSchema } from "./objects/MemberSelect.schema";
import { MemberUncheckedCreateInputObjectSchema } from "./objects/MemberUncheckedCreateInput.schema";
import { MemberUncheckedUpdateInputObjectSchema } from "./objects/MemberUncheckedUpdateInput.schema";
import { MemberUpdateInputObjectSchema } from "./objects/MemberUpdateInput.schema";
import { MemberWhereUniqueInputObjectSchema } from "./objects/MemberWhereUniqueInput.schema";

export const MemberUpsertOneSchema: z.ZodType<Prisma.MemberUpsertArgs> = z
	.object({
		select: MemberSelectObjectSchema.optional(),
		include: MemberIncludeObjectSchema.optional(),
		where: MemberWhereUniqueInputObjectSchema,
		create: z.union([
			MemberCreateInputObjectSchema,
			MemberUncheckedCreateInputObjectSchema,
		]),
		update: z.union([
			MemberUpdateInputObjectSchema,
			MemberUncheckedUpdateInputObjectSchema,
		]),
	})
	.strict() as unknown as z.ZodType<Prisma.MemberUpsertArgs>;

export const MemberUpsertOneZodSchema = z
	.object({
		select: MemberSelectObjectSchema.optional(),
		include: MemberIncludeObjectSchema.optional(),
		where: MemberWhereUniqueInputObjectSchema,
		create: z.union([
			MemberCreateInputObjectSchema,
			MemberUncheckedCreateInputObjectSchema,
		]),
		update: z.union([
			MemberUpdateInputObjectSchema,
			MemberUncheckedUpdateInputObjectSchema,
		]),
	})
	.strict();
