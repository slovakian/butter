import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { UserCreateOrConnectWithoutInvitationsInputObjectSchema } from "./UserCreateOrConnectWithoutInvitationsInput.schema";
import { UserCreateWithoutInvitationsInputObjectSchema } from "./UserCreateWithoutInvitationsInput.schema";
import { UserUncheckedCreateWithoutInvitationsInputObjectSchema } from "./UserUncheckedCreateWithoutInvitationsInput.schema";
import { UserUncheckedUpdateWithoutInvitationsInputObjectSchema } from "./UserUncheckedUpdateWithoutInvitationsInput.schema";
import { UserUpdateToOneWithWhereWithoutInvitationsInputObjectSchema } from "./UserUpdateToOneWithWhereWithoutInvitationsInput.schema";
import { UserUpdateWithoutInvitationsInputObjectSchema } from "./UserUpdateWithoutInvitationsInput.schema";
import { UserUpsertWithoutInvitationsInputObjectSchema } from "./UserUpsertWithoutInvitationsInput.schema";
import { UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutInvitationsInputObjectSchema),
					z.lazy(() => UserUncheckedCreateWithoutInvitationsInputObjectSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => UserCreateOrConnectWithoutInvitationsInputObjectSchema)
				.optional(),
			upsert: z
				.lazy(() => UserUpsertWithoutInvitationsInputObjectSchema)
				.optional(),
			connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
			update: z
				.union([
					z.lazy(
						() => UserUpdateToOneWithWhereWithoutInvitationsInputObjectSchema,
					),
					z.lazy(() => UserUpdateWithoutInvitationsInputObjectSchema),
					z.lazy(() => UserUncheckedUpdateWithoutInvitationsInputObjectSchema),
				])
				.optional(),
		})
		.strict();
export const UserUpdateOneRequiredWithoutInvitationsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutInvitationsNestedInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutInvitationsNestedInput>;
export const UserUpdateOneRequiredWithoutInvitationsNestedInputObjectZodSchema =
	makeSchema();
