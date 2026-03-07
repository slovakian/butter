import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { BoardIncludeObjectSchema } from "./objects/BoardInclude.schema";
import { BoardSelectObjectSchema } from "./objects/BoardSelect.schema";
import { BoardWhereUniqueInputObjectSchema } from "./objects/BoardWhereUniqueInput.schema";

export const BoardFindUniqueOrThrowSchema: z.ZodType<Prisma.BoardFindUniqueOrThrowArgs> =
	z
		.object({
			select: BoardSelectObjectSchema.optional(),
			include: BoardIncludeObjectSchema.optional(),
			where: BoardWhereUniqueInputObjectSchema,
		})
		.strict() as unknown as z.ZodType<Prisma.BoardFindUniqueOrThrowArgs>;

export const BoardFindUniqueOrThrowZodSchema = z
	.object({
		select: BoardSelectObjectSchema.optional(),
		include: BoardIncludeObjectSchema.optional(),
		where: BoardWhereUniqueInputObjectSchema,
	})
	.strict();
