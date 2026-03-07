import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { UserUncheckedUpdateWithoutThemesUsingInputObjectSchema } from "./UserUncheckedUpdateWithoutThemesUsingInput.schema";
import { UserUpdateWithoutThemesUsingInputObjectSchema } from "./UserUpdateWithoutThemesUsingInput.schema";
import { UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => UserWhereUniqueInputObjectSchema),
			data: z.union([
				z.lazy(() => UserUpdateWithoutThemesUsingInputObjectSchema),
				z.lazy(() => UserUncheckedUpdateWithoutThemesUsingInputObjectSchema),
			]),
		})
		.strict();
export const UserUpdateWithWhereUniqueWithoutThemesUsingInputObjectSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutThemesUsingInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutThemesUsingInput>;
export const UserUpdateWithWhereUniqueWithoutThemesUsingInputObjectZodSchema =
	makeSchema();
