import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { MemberCreateManyInputObjectSchema } from "./objects/MemberCreateManyInput.schema";
import { MemberSelectObjectSchema } from "./objects/MemberSelect.schema";

export const MemberCreateManyAndReturnSchema: z.ZodType<Prisma.MemberCreateManyAndReturnArgs> =
	z
		.object({
			select: MemberSelectObjectSchema.optional(),
			data: z.union([
				MemberCreateManyInputObjectSchema,
				z.array(MemberCreateManyInputObjectSchema),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict() as unknown as z.ZodType<Prisma.MemberCreateManyAndReturnArgs>;

export const MemberCreateManyAndReturnZodSchema = z
	.object({
		select: MemberSelectObjectSchema.optional(),
		data: z.union([
			MemberCreateManyInputObjectSchema,
			z.array(MemberCreateManyInputObjectSchema),
		]),
		skipDuplicates: z.boolean().optional(),
	})
	.strict();
