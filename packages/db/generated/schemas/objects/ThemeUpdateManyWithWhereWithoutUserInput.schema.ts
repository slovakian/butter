import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ThemeScalarWhereInputObjectSchema } from "./ThemeScalarWhereInput.schema";
import { ThemeUncheckedUpdateManyWithoutUserInputObjectSchema } from "./ThemeUncheckedUpdateManyWithoutUserInput.schema";
import { ThemeUpdateManyMutationInputObjectSchema } from "./ThemeUpdateManyMutationInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => ThemeScalarWhereInputObjectSchema),
			data: z.union([
				z.lazy(() => ThemeUpdateManyMutationInputObjectSchema),
				z.lazy(() => ThemeUncheckedUpdateManyWithoutUserInputObjectSchema),
			]),
		})
		.strict();
export const ThemeUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.ThemeUpdateManyWithWhereWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ThemeUpdateManyWithWhereWithoutUserInput>;
export const ThemeUpdateManyWithWhereWithoutUserInputObjectZodSchema =
	makeSchema();
