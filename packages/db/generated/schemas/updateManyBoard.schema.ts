import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { BoardUpdateManyMutationInputObjectSchema } from "./objects/BoardUpdateManyMutationInput.schema";
import { BoardWhereInputObjectSchema } from "./objects/BoardWhereInput.schema";

export const BoardUpdateManySchema: z.ZodType<Prisma.BoardUpdateManyArgs> = z
	.object({
		data: BoardUpdateManyMutationInputObjectSchema,
		where: BoardWhereInputObjectSchema.optional(),
	})
	.strict() as unknown as z.ZodType<Prisma.BoardUpdateManyArgs>;

export const BoardUpdateManyZodSchema = z
	.object({
		data: BoardUpdateManyMutationInputObjectSchema,
		where: BoardWhereInputObjectSchema.optional(),
	})
	.strict();
