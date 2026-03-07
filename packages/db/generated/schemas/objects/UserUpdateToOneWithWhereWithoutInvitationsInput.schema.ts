import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { UserUncheckedUpdateWithoutInvitationsInputObjectSchema } from "./UserUncheckedUpdateWithoutInvitationsInput.schema";
import { UserUpdateWithoutInvitationsInputObjectSchema } from "./UserUpdateWithoutInvitationsInput.schema";
import { UserWhereInputObjectSchema } from "./UserWhereInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => UserWhereInputObjectSchema).optional(),
			data: z.union([
				z.lazy(() => UserUpdateWithoutInvitationsInputObjectSchema),
				z.lazy(() => UserUncheckedUpdateWithoutInvitationsInputObjectSchema),
			]),
		})
		.strict();
export const UserUpdateToOneWithWhereWithoutInvitationsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutInvitationsInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutInvitationsInput>;
export const UserUpdateToOneWithWhereWithoutInvitationsInputObjectZodSchema =
	makeSchema();
