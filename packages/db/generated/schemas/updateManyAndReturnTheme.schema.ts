import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { ThemeSelectObjectSchema } from "./objects/ThemeSelect.schema";
import { ThemeUpdateManyMutationInputObjectSchema } from "./objects/ThemeUpdateManyMutationInput.schema";
import { ThemeWhereInputObjectSchema } from "./objects/ThemeWhereInput.schema";

export const ThemeUpdateManyAndReturnSchema: z.ZodType<Prisma.ThemeUpdateManyAndReturnArgs> =
	z
		.object({
			select: ThemeSelectObjectSchema.optional(),
			data: ThemeUpdateManyMutationInputObjectSchema,
			where: ThemeWhereInputObjectSchema.optional(),
		})
		.strict() as unknown as z.ZodType<Prisma.ThemeUpdateManyAndReturnArgs>;

export const ThemeUpdateManyAndReturnZodSchema = z
	.object({
		select: ThemeSelectObjectSchema.optional(),
		data: ThemeUpdateManyMutationInputObjectSchema,
		where: ThemeWhereInputObjectSchema.optional(),
	})
	.strict();
