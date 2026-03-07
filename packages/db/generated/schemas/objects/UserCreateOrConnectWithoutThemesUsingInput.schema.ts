import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { UserCreateWithoutThemesUsingInputObjectSchema } from "./UserCreateWithoutThemesUsingInput.schema";
import { UserUncheckedCreateWithoutThemesUsingInputObjectSchema } from "./UserUncheckedCreateWithoutThemesUsingInput.schema";
import { UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => UserWhereUniqueInputObjectSchema),
			create: z.union([
				z.lazy(() => UserCreateWithoutThemesUsingInputObjectSchema),
				z.lazy(() => UserUncheckedCreateWithoutThemesUsingInputObjectSchema),
			]),
		})
		.strict();
export const UserCreateOrConnectWithoutThemesUsingInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutThemesUsingInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutThemesUsingInput>;
export const UserCreateOrConnectWithoutThemesUsingInputObjectZodSchema =
	makeSchema();
