import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { BoardSelectObjectSchema } from "./objects/BoardSelect.schema";
import { BoardUpdateManyMutationInputObjectSchema } from "./objects/BoardUpdateManyMutationInput.schema";
import { BoardWhereInputObjectSchema } from "./objects/BoardWhereInput.schema";

export const BoardUpdateManyAndReturnSchema: z.ZodType<Prisma.BoardUpdateManyAndReturnArgs> =
	z
		.object({
			select: BoardSelectObjectSchema.optional(),
			data: BoardUpdateManyMutationInputObjectSchema,
			where: BoardWhereInputObjectSchema.optional(),
		})
		.strict() as unknown as z.ZodType<Prisma.BoardUpdateManyAndReturnArgs>;

export const BoardUpdateManyAndReturnZodSchema = z
	.object({
		select: BoardSelectObjectSchema.optional(),
		data: BoardUpdateManyMutationInputObjectSchema,
		where: BoardWhereInputObjectSchema.optional(),
	})
	.strict();
