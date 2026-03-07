import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { UserCreateOrConnectWithoutMessagesInputObjectSchema } from "./UserCreateOrConnectWithoutMessagesInput.schema";
import { UserCreateWithoutMessagesInputObjectSchema } from "./UserCreateWithoutMessagesInput.schema";
import { UserUncheckedCreateWithoutMessagesInputObjectSchema } from "./UserUncheckedCreateWithoutMessagesInput.schema";
import { UserUncheckedUpdateWithoutMessagesInputObjectSchema } from "./UserUncheckedUpdateWithoutMessagesInput.schema";
import { UserUpdateToOneWithWhereWithoutMessagesInputObjectSchema } from "./UserUpdateToOneWithWhereWithoutMessagesInput.schema";
import { UserUpdateWithoutMessagesInputObjectSchema } from "./UserUpdateWithoutMessagesInput.schema";
import { UserUpsertWithoutMessagesInputObjectSchema } from "./UserUpsertWithoutMessagesInput.schema";
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
			upsert: z
				.lazy(() => UserUpsertWithoutMessagesInputObjectSchema)
				.optional(),
			connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
			update: z
				.union([
					z.lazy(
						() => UserUpdateToOneWithWhereWithoutMessagesInputObjectSchema,
					),
					z.lazy(() => UserUpdateWithoutMessagesInputObjectSchema),
					z.lazy(() => UserUncheckedUpdateWithoutMessagesInputObjectSchema),
				])
				.optional(),
		})
		.strict();
export const UserUpdateOneRequiredWithoutMessagesNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutMessagesNestedInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutMessagesNestedInput>;
export const UserUpdateOneRequiredWithoutMessagesNestedInputObjectZodSchema =
	makeSchema();
