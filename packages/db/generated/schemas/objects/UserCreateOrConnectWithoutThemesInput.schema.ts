import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { UserCreateWithoutThemesInputObjectSchema } from "./UserCreateWithoutThemesInput.schema";
import { UserUncheckedCreateWithoutThemesInputObjectSchema } from "./UserUncheckedCreateWithoutThemesInput.schema";
import { UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => UserWhereUniqueInputObjectSchema),
			create: z.union([
				z.lazy(() => UserCreateWithoutThemesInputObjectSchema),
				z.lazy(() => UserUncheckedCreateWithoutThemesInputObjectSchema),
			]),
		})
		.strict();
export const UserCreateOrConnectWithoutThemesInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutThemesInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutThemesInput>;
export const UserCreateOrConnectWithoutThemesInputObjectZodSchema =
	makeSchema();
