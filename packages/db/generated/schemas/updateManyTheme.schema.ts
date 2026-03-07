import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { ThemeUpdateManyMutationInputObjectSchema } from "./objects/ThemeUpdateManyMutationInput.schema";
import { ThemeWhereInputObjectSchema } from "./objects/ThemeWhereInput.schema";

export const ThemeUpdateManySchema: z.ZodType<Prisma.ThemeUpdateManyArgs> = z
	.object({
		data: ThemeUpdateManyMutationInputObjectSchema,
		where: ThemeWhereInputObjectSchema.optional(),
	})
	.strict() as unknown as z.ZodType<Prisma.ThemeUpdateManyArgs>;

export const ThemeUpdateManyZodSchema = z
	.object({
		data: ThemeUpdateManyMutationInputObjectSchema,
		where: ThemeWhereInputObjectSchema.optional(),
	})
	.strict();
