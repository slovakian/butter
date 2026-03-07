import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { UserCreateOrConnectWithoutInvitationsInputObjectSchema } from "./UserCreateOrConnectWithoutInvitationsInput.schema";
import { UserCreateWithoutInvitationsInputObjectSchema } from "./UserCreateWithoutInvitationsInput.schema";
import { UserUncheckedCreateWithoutInvitationsInputObjectSchema } from "./UserUncheckedCreateWithoutInvitationsInput.schema";
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
			connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
		})
		.strict();
export const UserCreateNestedOneWithoutInvitationsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutInvitationsInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutInvitationsInput>;
export const UserCreateNestedOneWithoutInvitationsInputObjectZodSchema =
	makeSchema();
