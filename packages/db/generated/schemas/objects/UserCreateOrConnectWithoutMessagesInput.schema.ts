import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { UserCreateWithoutMessagesInputObjectSchema } from "./UserCreateWithoutMessagesInput.schema";
import { UserUncheckedCreateWithoutMessagesInputObjectSchema } from "./UserUncheckedCreateWithoutMessagesInput.schema";
import { UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => UserWhereUniqueInputObjectSchema),
			create: z.union([
				z.lazy(() => UserCreateWithoutMessagesInputObjectSchema),
				z.lazy(() => UserUncheckedCreateWithoutMessagesInputObjectSchema),
			]),
		})
		.strict();
export const UserCreateOrConnectWithoutMessagesInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutMessagesInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutMessagesInput>;
export const UserCreateOrConnectWithoutMessagesInputObjectZodSchema =
	makeSchema();
