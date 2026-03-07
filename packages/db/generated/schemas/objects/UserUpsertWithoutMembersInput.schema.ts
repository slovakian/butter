import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { UserCreateWithoutMembersInputObjectSchema } from "./UserCreateWithoutMembersInput.schema";
import { UserUncheckedCreateWithoutMembersInputObjectSchema } from "./UserUncheckedCreateWithoutMembersInput.schema";
import { UserUncheckedUpdateWithoutMembersInputObjectSchema } from "./UserUncheckedUpdateWithoutMembersInput.schema";
import { UserUpdateWithoutMembersInputObjectSchema } from "./UserUpdateWithoutMembersInput.schema";
import { UserWhereInputObjectSchema } from "./UserWhereInput.schema";

const makeSchema = () =>
	z
		.object({
			update: z.union([
				z.lazy(() => UserUpdateWithoutMembersInputObjectSchema),
				z.lazy(() => UserUncheckedUpdateWithoutMembersInputObjectSchema),
			]),
			create: z.union([
				z.lazy(() => UserCreateWithoutMembersInputObjectSchema),
				z.lazy(() => UserUncheckedCreateWithoutMembersInputObjectSchema),
			]),
			where: z.lazy(() => UserWhereInputObjectSchema).optional(),
		})
		.strict();
export const UserUpsertWithoutMembersInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutMembersInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutMembersInput>;
export const UserUpsertWithoutMembersInputObjectZodSchema = makeSchema();
