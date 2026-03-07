import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { UserCreateOrConnectWithoutMessagesInputObjectSchema } from "./UserCreateOrConnectWithoutMessagesInput.schema";
import { UserCreateWithoutMessagesInputObjectSchema } from "./UserCreateWithoutMessagesInput.schema";
import { UserUncheckedCreateWithoutMessagesInputObjectSchema } from "./UserUncheckedCreateWithoutMessagesInput.schema";
import { UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutMessagesInputObjectSchema),
					z.lazy(() => UserUncheckedCreateWithoutMessagesInputObjectSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => UserCreateOrConnectWithoutMessagesInputObjectSchema)
				.optional(),
			connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
		})
		.strict();
export const UserCreateNestedOneWithoutMessagesInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutMessagesInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutMessagesInput>;
export const UserCreateNestedOneWithoutMessagesInputObjectZodSchema =
	makeSchema();
