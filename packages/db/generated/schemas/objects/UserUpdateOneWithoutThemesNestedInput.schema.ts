import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { UserCreateOrConnectWithoutThemesInputObjectSchema } from "./UserCreateOrConnectWithoutThemesInput.schema";
import { UserCreateWithoutThemesInputObjectSchema } from "./UserCreateWithoutThemesInput.schema";
import { UserUncheckedCreateWithoutThemesInputObjectSchema } from "./UserUncheckedCreateWithoutThemesInput.schema";
import { UserUncheckedUpdateWithoutThemesInputObjectSchema } from "./UserUncheckedUpdateWithoutThemesInput.schema";
import { UserUpdateToOneWithWhereWithoutThemesInputObjectSchema } from "./UserUpdateToOneWithWhereWithoutThemesInput.schema";
import { UserUpdateWithoutThemesInputObjectSchema } from "./UserUpdateWithoutThemesInput.schema";
import { UserUpsertWithoutThemesInputObjectSchema } from "./UserUpsertWithoutThemesInput.schema";
import { UserWhereInputObjectSchema } from "./UserWhereInput.schema";
import { UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutThemesInputObjectSchema),
					z.lazy(() => UserUncheckedCreateWithoutThemesInputObjectSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => UserCreateOrConnectWithoutThemesInputObjectSchema)
				.optional(),
			upsert: z.lazy(() => UserUpsertWithoutThemesInputObjectSchema).optional(),
			disconnect: z
				.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)])
				.optional(),
			delete: z
				.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)])
				.optional(),
			connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
			update: z
				.union([
					z.lazy(() => UserUpdateToOneWithWhereWithoutThemesInputObjectSchema),
					z.lazy(() => UserUpdateWithoutThemesInputObjectSchema),
					z.lazy(() => UserUncheckedUpdateWithoutThemesInputObjectSchema),
				])
				.optional(),
		})
		.strict();
export const UserUpdateOneWithoutThemesNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneWithoutThemesNestedInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneWithoutThemesNestedInput>;
export const UserUpdateOneWithoutThemesNestedInputObjectZodSchema =
	makeSchema();
