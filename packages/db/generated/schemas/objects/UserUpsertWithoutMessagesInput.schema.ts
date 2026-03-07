import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { UserCreateWithoutMessagesInputObjectSchema } from "./UserCreateWithoutMessagesInput.schema";
import { UserUncheckedCreateWithoutMessagesInputObjectSchema } from "./UserUncheckedCreateWithoutMessagesInput.schema";
import { UserUncheckedUpdateWithoutMessagesInputObjectSchema } from "./UserUncheckedUpdateWithoutMessagesInput.schema";
import { UserUpdateWithoutMessagesInputObjectSchema } from "./UserUpdateWithoutMessagesInput.schema";
import { UserWhereInputObjectSchema } from "./UserWhereInput.schema";

const makeSchema = () =>
	z
		.object({
			update: z.union([
				z.lazy(() => UserUpdateWithoutMessagesInputObjectSchema),
				z.lazy(() => UserUncheckedUpdateWithoutMessagesInputObjectSchema),
			]),
			create: z.union([
				z.lazy(() => UserCreateWithoutMessagesInputObjectSchema),
				z.lazy(() => UserUncheckedCreateWithoutMessagesInputObjectSchema),
			]),
			where: z.lazy(() => UserWhereInputObjectSchema).optional(),
		})
		.strict();
export const UserUpsertWithoutMessagesInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutMessagesInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutMessagesInput>;
export const UserUpsertWithoutMessagesInputObjectZodSchema = makeSchema();
