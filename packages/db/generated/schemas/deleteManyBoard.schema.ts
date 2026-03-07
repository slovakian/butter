import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { BoardWhereInputObjectSchema } from "./objects/BoardWhereInput.schema";

export const BoardDeleteManySchema: z.ZodType<Prisma.BoardDeleteManyArgs> = z
	.object({ where: BoardWhereInputObjectSchema.optional() })
	.strict() as unknown as z.ZodType<Prisma.BoardDeleteManyArgs>;

export const BoardDeleteManyZodSchema = z
	.object({ where: BoardWhereInputObjectSchema.optional() })
	.strict();
