import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { UserCountOutputTypeCountAccountsArgsObjectSchema } from "./UserCountOutputTypeCountAccountsArgs.schema";
import { UserCountOutputTypeCountInvitationsArgsObjectSchema } from "./UserCountOutputTypeCountInvitationsArgs.schema";
import { UserCountOutputTypeCountMembersArgsObjectSchema } from "./UserCountOutputTypeCountMembersArgs.schema";
import { UserCountOutputTypeCountMessagesArgsObjectSchema } from "./UserCountOutputTypeCountMessagesArgs.schema";
import { UserCountOutputTypeCountSessionsArgsObjectSchema } from "./UserCountOutputTypeCountSessionsArgs.schema";
import { UserCountOutputTypeCountThemesArgsObjectSchema } from "./UserCountOutputTypeCountThemesArgs.schema";
import { UserCountOutputTypeCountThemesUsingArgsObjectSchema } from "./UserCountOutputTypeCountThemesUsingArgs.schema";

const makeSchema = () =>
	z
		.object({
			sessions: z
				.union([
					z.boolean(),
					z.lazy(() => UserCountOutputTypeCountSessionsArgsObjectSchema),
				])
				.optional(),
			accounts: z
				.union([
					z.boolean(),
					z.lazy(() => UserCountOutputTypeCountAccountsArgsObjectSchema),
				])
				.optional(),
			members: z
				.union([
					z.boolean(),
					z.lazy(() => UserCountOutputTypeCountMembersArgsObjectSchema),
				])
				.optional(),
			invitations: z
				.union([
					z.boolean(),
					z.lazy(() => UserCountOutputTypeCountInvitationsArgsObjectSchema),
				])
				.optional(),
			themes: z
				.union([
					z.boolean(),
					z.lazy(() => UserCountOutputTypeCountThemesArgsObjectSchema),
				])
				.optional(),
			themesUsing: z
				.union([
					z.boolean(),
					z.lazy(() => UserCountOutputTypeCountThemesUsingArgsObjectSchema),
				])
				.optional(),
			messages: z
				.union([
					z.boolean(),
					z.lazy(() => UserCountOutputTypeCountMessagesArgsObjectSchema),
				])
				.optional(),
		})
		.strict();
export const UserCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> =
	makeSchema() as unknown as z.ZodType<Prisma.UserCountOutputTypeSelect>;
export const UserCountOutputTypeSelectObjectZodSchema = makeSchema();
