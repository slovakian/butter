import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { AccountFindManySchema } from "../findManyAccount.schema";
import { InvitationFindManySchema } from "../findManyInvitation.schema";
import { MemberFindManySchema } from "../findManyMember.schema";
import { MessageFindManySchema } from "../findManyMessage.schema";
import { SessionFindManySchema } from "../findManySession.schema";
import { ThemeFindManySchema } from "../findManyTheme.schema";
import { UserCountOutputTypeArgsObjectSchema } from "./UserCountOutputTypeArgs.schema";

const makeSchema = () =>
	z
		.object({
			id: z.boolean().optional(),
			name: z.boolean().optional(),
			email: z.boolean().optional(),
			emailVerified: z.boolean().optional(),
			image: z.boolean().optional(),
			createdAt: z.boolean().optional(),
			updatedAt: z.boolean().optional(),
			role: z.boolean().optional(),
			banned: z.boolean().optional(),
			banReason: z.boolean().optional(),
			banExpires: z.boolean().optional(),
			isAnonymous: z.boolean().optional(),
			sessions: z
				.union([z.boolean(), z.lazy(() => SessionFindManySchema)])
				.optional(),
			accounts: z
				.union([z.boolean(), z.lazy(() => AccountFindManySchema)])
				.optional(),
			members: z
				.union([z.boolean(), z.lazy(() => MemberFindManySchema)])
				.optional(),
			invitations: z
				.union([z.boolean(), z.lazy(() => InvitationFindManySchema)])
				.optional(),
			themes: z
				.union([z.boolean(), z.lazy(() => ThemeFindManySchema)])
				.optional(),
			themesUsing: z
				.union([z.boolean(), z.lazy(() => ThemeFindManySchema)])
				.optional(),
			messages: z
				.union([z.boolean(), z.lazy(() => MessageFindManySchema)])
				.optional(),
			_count: z
				.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)])
				.optional(),
		})
		.strict();
export const UserSelectObjectSchema: z.ZodType<Prisma.UserSelect> =
	makeSchema() as unknown as z.ZodType<Prisma.UserSelect>;
export const UserSelectObjectZodSchema = makeSchema();
