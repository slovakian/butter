import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { UserCreateWithoutMembersInputObjectSchema } from "./UserCreateWithoutMembersInput.schema";
import { UserUncheckedCreateWithoutMembersInputObjectSchema } from "./UserUncheckedCreateWithoutMembersInput.schema";
import { UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => UserWhereUniqueInputObjectSchema),
			create: z.union([
				z.lazy(() => UserCreateWithoutMembersInputObjectSchema),
				z.lazy(() => UserUncheckedCreateWithoutMembersInputObjectSchema),
			]),
		})
		.strict();
export const UserCreateOrConnectWithoutMembersInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutMembersInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutMembersInput>;
export const UserCreateOrConnectWithoutMembersInputObjectZodSchema =
	makeSchema();
