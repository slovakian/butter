import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ThemeScalarWhereInputObjectSchema } from "./ThemeScalarWhereInput.schema";
import { ThemeUncheckedUpdateManyWithoutUsersUsingInputObjectSchema } from "./ThemeUncheckedUpdateManyWithoutUsersUsingInput.schema";
import { ThemeUpdateManyMutationInputObjectSchema } from "./ThemeUpdateManyMutationInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => ThemeScalarWhereInputObjectSchema),
			data: z.union([
				z.lazy(() => ThemeUpdateManyMutationInputObjectSchema),
				z.lazy(
					() => ThemeUncheckedUpdateManyWithoutUsersUsingInputObjectSchema,
				),
			]),
		})
		.strict();
export const ThemeUpdateManyWithWhereWithoutUsersUsingInputObjectSchema: z.ZodType<Prisma.ThemeUpdateManyWithWhereWithoutUsersUsingInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ThemeUpdateManyWithWhereWithoutUsersUsingInput>;
export const ThemeUpdateManyWithWhereWithoutUsersUsingInputObjectZodSchema =
	makeSchema();
