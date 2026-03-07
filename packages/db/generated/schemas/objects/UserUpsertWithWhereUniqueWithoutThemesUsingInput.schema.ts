import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { UserCreateWithoutThemesUsingInputObjectSchema } from "./UserCreateWithoutThemesUsingInput.schema";
import { UserUncheckedCreateWithoutThemesUsingInputObjectSchema } from "./UserUncheckedCreateWithoutThemesUsingInput.schema";
import { UserUncheckedUpdateWithoutThemesUsingInputObjectSchema } from "./UserUncheckedUpdateWithoutThemesUsingInput.schema";
import { UserUpdateWithoutThemesUsingInputObjectSchema } from "./UserUpdateWithoutThemesUsingInput.schema";
import { UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => UserWhereUniqueInputObjectSchema),
			update: z.union([
				z.lazy(() => UserUpdateWithoutThemesUsingInputObjectSchema),
				z.lazy(() => UserUncheckedUpdateWithoutThemesUsingInputObjectSchema),
			]),
			create: z.union([
				z.lazy(() => UserCreateWithoutThemesUsingInputObjectSchema),
				z.lazy(() => UserUncheckedCreateWithoutThemesUsingInputObjectSchema),
			]),
		})
		.strict();
export const UserUpsertWithWhereUniqueWithoutThemesUsingInputObjectSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutThemesUsingInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutThemesUsingInput>;
export const UserUpsertWithWhereUniqueWithoutThemesUsingInputObjectZodSchema =
	makeSchema();
