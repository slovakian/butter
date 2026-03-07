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
export const UserIncludeObjectSchema: z.ZodType<Prisma.UserInclude> =
	makeSchema() as unknown as z.ZodType<Prisma.UserInclude>;
export const UserIncludeObjectZodSchema = makeSchema();
