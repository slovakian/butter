import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { UserCreateWithoutThemesInputObjectSchema } from "./UserCreateWithoutThemesInput.schema";
import { UserUncheckedCreateWithoutThemesInputObjectSchema } from "./UserUncheckedCreateWithoutThemesInput.schema";
import { UserUncheckedUpdateWithoutThemesInputObjectSchema } from "./UserUncheckedUpdateWithoutThemesInput.schema";
import { UserUpdateWithoutThemesInputObjectSchema } from "./UserUpdateWithoutThemesInput.schema";
import { UserWhereInputObjectSchema } from "./UserWhereInput.schema";

const makeSchema = () =>
	z
		.object({
			update: z.union([
				z.lazy(() => UserUpdateWithoutThemesInputObjectSchema),
				z.lazy(() => UserUncheckedUpdateWithoutThemesInputObjectSchema),
			]),
			create: z.union([
				z.lazy(() => UserCreateWithoutThemesInputObjectSchema),
				z.lazy(() => UserUncheckedCreateWithoutThemesInputObjectSchema),
			]),
			where: z.lazy(() => UserWhereInputObjectSchema).optional(),
		})
		.strict();
export const UserUpsertWithoutThemesInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutThemesInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutThemesInput>;
export const UserUpsertWithoutThemesInputObjectZodSchema = makeSchema();
