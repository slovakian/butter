import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { ThemeWhereInputObjectSchema } from "./objects/ThemeWhereInput.schema";

export const ThemeDeleteManySchema: z.ZodType<Prisma.ThemeDeleteManyArgs> = z
	.object({ where: ThemeWhereInputObjectSchema.optional() })
	.strict() as unknown as z.ZodType<Prisma.ThemeDeleteManyArgs>;

export const ThemeDeleteManyZodSchema = z
	.object({ where: ThemeWhereInputObjectSchema.optional() })
	.strict();
