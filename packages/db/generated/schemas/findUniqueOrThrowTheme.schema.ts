import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { ThemeIncludeObjectSchema } from "./objects/ThemeInclude.schema";
import { ThemeSelectObjectSchema } from "./objects/ThemeSelect.schema";
import { ThemeWhereUniqueInputObjectSchema } from "./objects/ThemeWhereUniqueInput.schema";

export const ThemeFindUniqueOrThrowSchema: z.ZodType<Prisma.ThemeFindUniqueOrThrowArgs> =
	z
		.object({
			select: ThemeSelectObjectSchema.optional(),
			include: ThemeIncludeObjectSchema.optional(),
			where: ThemeWhereUniqueInputObjectSchema,
		})
		.strict() as unknown as z.ZodType<Prisma.ThemeFindUniqueOrThrowArgs>;

export const ThemeFindUniqueOrThrowZodSchema = z
	.object({
		select: ThemeSelectObjectSchema.optional(),
		include: ThemeIncludeObjectSchema.optional(),
		where: ThemeWhereUniqueInputObjectSchema,
	})
	.strict();
