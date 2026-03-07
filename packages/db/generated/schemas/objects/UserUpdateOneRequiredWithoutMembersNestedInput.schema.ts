import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { UserCreateOrConnectWithoutMembersInputObjectSchema } from "./UserCreateOrConnectWithoutMembersInput.schema";
import { UserCreateWithoutMembersInputObjectSchema } from "./UserCreateWithoutMembersInput.schema";
import { UserUncheckedCreateWithoutMembersInputObjectSchema } from "./UserUncheckedCreateWithoutMembersInput.schema";
import { UserUncheckedUpdateWithoutMembersInputObjectSchema } from "./UserUncheckedUpdateWithoutMembersInput.schema";
import { UserUpdateToOneWithWhereWithoutMembersInputObjectSchema } from "./UserUpdateToOneWithWhereWithoutMembersInput.schema";
import { UserUpdateWithoutMembersInputObjectSchema } from "./UserUpdateWithoutMembersInput.schema";
import { UserUpsertWithoutMembersInputObjectSchema } from "./UserUpsertWithoutMembersInput.schema";
import { UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutMembersInputObjectSchema),
					z.lazy(() => UserUncheckedCreateWithoutMembersInputObjectSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => UserCreateOrConnectWithoutMembersInputObjectSchema)
				.optional(),
			upsert: z
				.lazy(() => UserUpsertWithoutMembersInputObjectSchema)
				.optional(),
			connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
			update: z
				.union([
					z.lazy(() => UserUpdateToOneWithWhereWithoutMembersInputObjectSchema),
					z.lazy(() => UserUpdateWithoutMembersInputObjectSchema),
					z.lazy(() => UserUncheckedUpdateWithoutMembersInputObjectSchema),
				])
				.optional(),
		})
		.strict();
export const UserUpdateOneRequiredWithoutMembersNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutMembersNestedInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutMembersNestedInput>;
export const UserUpdateOneRequiredWithoutMembersNestedInputObjectZodSchema =
	makeSchema();
