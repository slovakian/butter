import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { UserScalarWhereInputObjectSchema } from "./UserScalarWhereInput.schema";
import { UserUncheckedUpdateManyWithoutThemesUsingInputObjectSchema } from "./UserUncheckedUpdateManyWithoutThemesUsingInput.schema";
import { UserUpdateManyMutationInputObjectSchema } from "./UserUpdateManyMutationInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => UserScalarWhereInputObjectSchema),
			data: z.union([
				z.lazy(() => UserUpdateManyMutationInputObjectSchema),
				z.lazy(
					() => UserUncheckedUpdateManyWithoutThemesUsingInputObjectSchema,
				),
			]),
		})
		.strict();
export const UserUpdateManyWithWhereWithoutThemesUsingInputObjectSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutThemesUsingInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserUpdateManyWithWhereWithoutThemesUsingInput>;
export const UserUpdateManyWithWhereWithoutThemesUsingInputObjectZodSchema =
	makeSchema();
