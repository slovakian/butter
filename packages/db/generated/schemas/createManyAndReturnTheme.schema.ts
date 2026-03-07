import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { ThemeCreateManyInputObjectSchema } from "./objects/ThemeCreateManyInput.schema";
import { ThemeSelectObjectSchema } from "./objects/ThemeSelect.schema";

export const ThemeCreateManyAndReturnSchema: z.ZodType<Prisma.ThemeCreateManyAndReturnArgs> =
	z
		.object({
			select: ThemeSelectObjectSchema.optional(),
			data: z.union([
				ThemeCreateManyInputObjectSchema,
				z.array(ThemeCreateManyInputObjectSchema),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict() as unknown as z.ZodType<Prisma.ThemeCreateManyAndReturnArgs>;

export const ThemeCreateManyAndReturnZodSchema = z
	.object({
		select: ThemeSelectObjectSchema.optional(),
		data: z.union([
			ThemeCreateManyInputObjectSchema,
			z.array(ThemeCreateManyInputObjectSchema),
		]),
		skipDuplicates: z.boolean().optional(),
	})
	.strict();
