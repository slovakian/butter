import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { ThemeIncludeObjectSchema } from "./objects/ThemeInclude.schema";
import { ThemeSelectObjectSchema } from "./objects/ThemeSelect.schema";
import { ThemeUncheckedUpdateInputObjectSchema } from "./objects/ThemeUncheckedUpdateInput.schema";
import { ThemeUpdateInputObjectSchema } from "./objects/ThemeUpdateInput.schema";
import { ThemeWhereUniqueInputObjectSchema } from "./objects/ThemeWhereUniqueInput.schema";

export const ThemeUpdateOneSchema: z.ZodType<Prisma.ThemeUpdateArgs> = z
	.object({
		select: ThemeSelectObjectSchema.optional(),
		include: ThemeIncludeObjectSchema.optional(),
		data: z.union([
			ThemeUpdateInputObjectSchema,
			ThemeUncheckedUpdateInputObjectSchema,
		]),
		where: ThemeWhereUniqueInputObjectSchema,
	})
	.strict() as unknown as z.ZodType<Prisma.ThemeUpdateArgs>;

export const ThemeUpdateOneZodSchema = z
	.object({
		select: ThemeSelectObjectSchema.optional(),
		include: ThemeIncludeObjectSchema.optional(),
		data: z.union([
			ThemeUpdateInputObjectSchema,
			ThemeUncheckedUpdateInputObjectSchema,
		]),
		where: ThemeWhereUniqueInputObjectSchema,
	})
	.strict();
