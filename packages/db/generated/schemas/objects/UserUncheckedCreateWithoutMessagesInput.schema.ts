import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema } from "./AccountUncheckedCreateNestedManyWithoutUserInput.schema";
import { InvitationUncheckedCreateNestedManyWithoutUserInputObjectSchema } from "./InvitationUncheckedCreateNestedManyWithoutUserInput.schema";
import { MemberUncheckedCreateNestedManyWithoutUserInputObjectSchema } from "./MemberUncheckedCreateNestedManyWithoutUserInput.schema";
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
			updatedAt: z.coerce.date().optional(),
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
		})
		.strict();
export const UserUncheckedCreateWithoutMessagesInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutMessagesInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateWithoutMessagesInput>;
export const UserUncheckedCreateWithoutMessagesInputObjectZodSchema =
	makeSchema();
