import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoardScalarWhereInputObjectSchema } from "./BoardScalarWhereInput.schema";
import { BoardUncheckedUpdateManyWithoutThemeInputObjectSchema } from "./BoardUncheckedUpdateManyWithoutThemeInput.schema";
import { BoardUpdateManyMutationInputObjectSchema } from "./BoardUpdateManyMutationInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => BoardScalarWhereInputObjectSchema),
			data: z.union([
				z.lazy(() => BoardUpdateManyMutationInputObjectSchema),
				z.lazy(() => BoardUncheckedUpdateManyWithoutThemeInputObjectSchema),
			]),
		})
		.strict();
export const BoardUpdateManyWithWhereWithoutThemeInputObjectSchema: z.ZodType<Prisma.BoardUpdateManyWithWhereWithoutThemeInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BoardUpdateManyWithWhereWithoutThemeInput>;
export const BoardUpdateManyWithWhereWithoutThemeInputObjectZodSchema =
	makeSchema();
