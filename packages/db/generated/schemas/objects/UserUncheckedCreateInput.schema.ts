import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema } from "./AccountUncheckedCreateNestedManyWithoutUserInput.schema";
import { InvitationUncheckedCreateNestedManyWithoutUserInputObjectSchema } from "./InvitationUncheckedCreateNestedManyWithoutUserInput.schema";
import { MemberUncheckedCreateNestedManyWithoutUserInputObjectSchema } from "./MemberUncheckedCreateNestedManyWithoutUserInput.schema";
import { MessageUncheckedCreateNestedManyWithoutUserInputObjectSchema } from "./MessageUncheckedCreateNestedManyWithoutUserInput.schema";
import { SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema } from "./SessionUncheckedCreateNestedManyWithoutUserInput.schema";
import { ThemeUncheckedCreateNestedManyWithoutUserInputObjectSchema } from "./ThemeUncheckedCreateNestedManyWithoutUserInput.schema";
import { ThemeUncheckedCreateNestedManyWithoutUsersUsingInputObjectSchema } from "./ThemeUncheckedCreateNestedManyWithoutUsersUsingInput.schema";

const makeSchema = () =>
	z
		.object({
			id: z.number().int().optional(),
			name: z.string(),
			email: z.string(),
			emailVerified: z.boolean().optional(),
			image: z.string().optional().nullable(),
			createdAt: z.coerce.date().optional(),
			role: z.string().optional().nullable(),
			banned: z.boolean().optional().nullable(),
			banReason: z.string().optional().nullable(),
			banExpires: z.coerce.date().optional().nullable(),
			isAnonymous: z.boolean().optional().nullable(),
			sessions: z
				.lazy(
					() => SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema,
				)
				.optional(),
			accounts: z
				.lazy(
					() => AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema,
				)
				.optional(),
			members: z
				.lazy(() => MemberUncheckedCreateNestedManyWithoutUserInputObjectSchema)
				.optional(),
			invitations: z
				.lazy(
					() => InvitationUncheckedCreateNestedManyWithoutUserInputObjectSchema,
				)
				.optional(),
			themes: z
				.lazy(() => ThemeUncheckedCreateNestedManyWithoutUserInputObjectSchema)
				.optional(),
			themesUsing: z
				.lazy(
					() =>
						ThemeUncheckedCreateNestedManyWithoutUsersUsingInputObjectSchema,
				)
				.optional(),
			messages: z
				.lazy(
					() => MessageUncheckedCreateNestedManyWithoutUserInputObjectSchema,
				)
				.optional(),
		})
		.strict();
export const UserUncheckedCreateInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateInput>;
export const UserUncheckedCreateInputObjectZodSchema = makeSchema();
