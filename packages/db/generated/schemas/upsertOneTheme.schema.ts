import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { ThemeCreateInputObjectSchema } from "./objects/ThemeCreateInput.schema";
import { ThemeIncludeObjectSchema } from "./objects/ThemeInclude.schema";
import { ThemeSelectObjectSchema } from "./objects/ThemeSelect.schema";
import { ThemeUncheckedCreateInputObjectSchema } from "./objects/ThemeUncheckedCreateInput.schema";
import { ThemeUncheckedUpdateInputObjectSchema } from "./objects/ThemeUncheckedUpdateInput.schema";
import { ThemeUpdateInputObjectSchema } from "./objects/ThemeUpdateInput.schema";
import { ThemeWhereUniqueInputObjectSchema } from "./objects/ThemeWhereUniqueInput.schema";

export const ThemeUpsertOneSchema: z.ZodType<Prisma.ThemeUpsertArgs> = z
	.object({
		select: ThemeSelectObjectSchema.optional(),
		include: ThemeIncludeObjectSchema.optional(),
		where: ThemeWhereUniqueInputObjectSchema,
		create: z.union([
			ThemeCreateInputObjectSchema,
			ThemeUncheckedCreateInputObjectSchema,
		]),
		update: z.union([
			ThemeUpdateInputObjectSchema,
			ThemeUncheckedUpdateInputObjectSchema,
		]),
	})
	.strict() as unknown as z.ZodType<Prisma.ThemeUpsertArgs>;

export const ThemeUpsertOneZodSchema = z
	.object({
		select: ThemeSelectObjectSchema.optional(),
		include: ThemeIncludeObjectSchema.optional(),
		where: ThemeWhereUniqueInputObjectSchema,
		create: z.union([
			ThemeCreateInputObjectSchema,
			ThemeUncheckedCreateInputObjectSchema,
		]),
		update: z.union([
			ThemeUpdateInputObjectSchema,
			ThemeUncheckedUpdateInputObjectSchema,
		]),
	})
	.strict();
