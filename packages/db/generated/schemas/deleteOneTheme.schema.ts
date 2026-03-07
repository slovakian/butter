import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { ThemeIncludeObjectSchema } from "./objects/ThemeInclude.schema";
import { ThemeSelectObjectSchema } from "./objects/ThemeSelect.schema";
import { ThemeWhereUniqueInputObjectSchema } from "./objects/ThemeWhereUniqueInput.schema";

export const ThemeDeleteOneSchema: z.ZodType<Prisma.ThemeDeleteArgs> = z
	.object({
		select: ThemeSelectObjectSchema.optional(),
		include: ThemeIncludeObjectSchema.optional(),
		where: ThemeWhereUniqueInputObjectSchema,
	})
	.strict() as unknown as z.ZodType<Prisma.ThemeDeleteArgs>;

export const ThemeDeleteOneZodSchema = z
	.object({
		select: ThemeSelectObjectSchema.optional(),
		include: ThemeIncludeObjectSchema.optional(),
		where: ThemeWhereUniqueInputObjectSchema,
	})
	.strict();
