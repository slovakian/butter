import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { InvitationCreateNestedManyWithoutUserInputObjectSchema } from "./InvitationCreateNestedManyWithoutUserInput.schema";
import { MemberCreateNestedManyWithoutUserInputObjectSchema } from "./MemberCreateNestedManyWithoutUserInput.schema";
import { MessageCreateNestedManyWithoutUserInputObjectSchema } from "./MessageCreateNestedManyWithoutUserInput.schema";
import { SessionCreateNestedManyWithoutUserInputObjectSchema } from "./SessionCreateNestedManyWithoutUserInput.schema";
import { ThemeCreateNestedManyWithoutUserInputObjectSchema } from "./ThemeCreateNestedManyWithoutUserInput.schema";
import { ThemeCreateNestedManyWithoutUsersUsingInputObjectSchema } from "./ThemeCreateNestedManyWithoutUsersUsingInput.schema";

const makeSchema = () =>
	z
		.object({
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
				.lazy(() => SessionCreateNestedManyWithoutUserInputObjectSchema)
				.optional(),
			members: z
				.lazy(() => MemberCreateNestedManyWithoutUserInputObjectSchema)
				.optional(),
			invitations: z
				.lazy(() => InvitationCreateNestedManyWithoutUserInputObjectSchema)
				.optional(),
			themes: z
				.lazy(() => ThemeCreateNestedManyWithoutUserInputObjectSchema)
				.optional(),
			themesUsing: z
				.lazy(() => ThemeCreateNestedManyWithoutUsersUsingInputObjectSchema)
				.optional(),
			messages: z
				.lazy(() => MessageCreateNestedManyWithoutUserInputObjectSchema)
				.optional(),
		})
		.strict();
export const UserCreateWithoutAccountsInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserCreateWithoutAccountsInput>;
export const UserCreateWithoutAccountsInputObjectZodSchema = makeSchema();
