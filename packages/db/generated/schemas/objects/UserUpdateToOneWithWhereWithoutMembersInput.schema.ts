import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { UserUncheckedUpdateWithoutMembersInputObjectSchema } from "./UserUncheckedUpdateWithoutMembersInput.schema";
import { UserUpdateWithoutMembersInputObjectSchema } from "./UserUpdateWithoutMembersInput.schema";
import { UserWhereInputObjectSchema } from "./UserWhereInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => UserWhereInputObjectSchema).optional(),
			data: z.union([
				z.lazy(() => UserUpdateWithoutMembersInputObjectSchema),
				z.lazy(() => UserUncheckedUpdateWithoutMembersInputObjectSchema),
			]),
		})
		.strict();
export const UserUpdateToOneWithWhereWithoutMembersInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutMembersInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutMembersInput>;
export const UserUpdateToOneWithWhereWithoutMembersInputObjectZodSchema =
	makeSchema();
