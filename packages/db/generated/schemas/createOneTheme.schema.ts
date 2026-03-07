import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { ThemeCreateInputObjectSchema } from "./objects/ThemeCreateInput.schema";
import { ThemeIncludeObjectSchema } from "./objects/ThemeInclude.schema";
import { ThemeSelectObjectSchema } from "./objects/ThemeSelect.schema";
import { ThemeUncheckedCreateInputObjectSchema } from "./objects/ThemeUncheckedCreateInput.schema";

export const ThemeCreateOneSchema: z.ZodType<Prisma.ThemeCreateArgs> = z
	.object({
		select: ThemeSelectObjectSchema.optional(),
		include: ThemeIncludeObjectSchema.optional(),
		data: z.union([
			ThemeCreateInputObjectSchema,
			ThemeUncheckedCreateInputObjectSchema,
		]),
	})
	.strict() as unknown as z.ZodType<Prisma.ThemeCreateArgs>;

export const ThemeCreateOneZodSchema = z
	.object({
		select: ThemeSelectObjectSchema.optional(),
		include: ThemeIncludeObjectSchema.optional(),
		data: z.union([
			ThemeCreateInputObjectSchema,
			ThemeUncheckedCreateInputObjectSchema,
		]),
	})
	.strict();
