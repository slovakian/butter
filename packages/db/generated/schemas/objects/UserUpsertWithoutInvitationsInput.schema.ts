import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { UserCreateWithoutInvitationsInputObjectSchema } from "./UserCreateWithoutInvitationsInput.schema";
import { UserUncheckedCreateWithoutInvitationsInputObjectSchema } from "./UserUncheckedCreateWithoutInvitationsInput.schema";
import { UserUncheckedUpdateWithoutInvitationsInputObjectSchema } from "./UserUncheckedUpdateWithoutInvitationsInput.schema";
import { UserUpdateWithoutInvitationsInputObjectSchema } from "./UserUpdateWithoutInvitationsInput.schema";
import { UserWhereInputObjectSchema } from "./UserWhereInput.schema";

const makeSchema = () =>
	z
		.object({
			update: z.union([
				z.lazy(() => UserUpdateWithoutInvitationsInputObjectSchema),
				z.lazy(() => UserUncheckedUpdateWithoutInvitationsInputObjectSchema),
			]),
			create: z.union([
				z.lazy(() => UserCreateWithoutInvitationsInputObjectSchema),
				z.lazy(() => UserUncheckedCreateWithoutInvitationsInputObjectSchema),
			]),
			where: z.lazy(() => UserWhereInputObjectSchema).optional(),
		})
		.strict();
export const UserUpsertWithoutInvitationsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutInvitationsInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutInvitationsInput>;
export const UserUpsertWithoutInvitationsInputObjectZodSchema = makeSchema();
