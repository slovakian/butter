import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { UserCreateWithoutInvitationsInputObjectSchema } from "./UserCreateWithoutInvitationsInput.schema";
import { UserUncheckedCreateWithoutInvitationsInputObjectSchema } from "./UserUncheckedCreateWithoutInvitationsInput.schema";
import { UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => UserWhereUniqueInputObjectSchema),
			create: z.union([
				z.lazy(() => UserCreateWithoutInvitationsInputObjectSchema),
				z.lazy(() => UserUncheckedCreateWithoutInvitationsInputObjectSchema),
			]),
		})
		.strict();
export const UserCreateOrConnectWithoutInvitationsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutInvitationsInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutInvitationsInput>;
export const UserCreateOrConnectWithoutInvitationsInputObjectZodSchema =
	makeSchema();
