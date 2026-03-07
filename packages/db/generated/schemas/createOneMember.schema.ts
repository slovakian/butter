import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { MemberCreateInputObjectSchema } from "./objects/MemberCreateInput.schema";
import { MemberIncludeObjectSchema } from "./objects/MemberInclude.schema";
import { MemberSelectObjectSchema } from "./objects/MemberSelect.schema";
import { MemberUncheckedCreateInputObjectSchema } from "./objects/MemberUncheckedCreateInput.schema";

export const MemberCreateOneSchema: z.ZodType<Prisma.MemberCreateArgs> = z
	.object({
		select: MemberSelectObjectSchema.optional(),
		include: MemberIncludeObjectSchema.optional(),
		data: z.union([
			MemberCreateInputObjectSchema,
			MemberUncheckedCreateInputObjectSchema,
		]),
	})
	.strict() as unknown as z.ZodType<Prisma.MemberCreateArgs>;

export const MemberCreateOneZodSchema = z
	.object({
		select: MemberSelectObjectSchema.optional(),
		include: MemberIncludeObjectSchema.optional(),
		data: z.union([
			MemberCreateInputObjectSchema,
			MemberUncheckedCreateInputObjectSchema,
		]),
	})
	.strict();
