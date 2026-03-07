import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoardCountOutputTypeCountChatroomsArgsObjectSchema } from "./BoardCountOutputTypeCountChatroomsArgs.schema";
import { BoardCountOutputTypeCountInvitationsArgsObjectSchema } from "./BoardCountOutputTypeCountInvitationsArgs.schema";
import { BoardCountOutputTypeCountMembersArgsObjectSchema } from "./BoardCountOutputTypeCountMembersArgs.schema";

const makeSchema = () =>
	z
		.object({
			members: z
				.union([
					z.boolean(),
					z.lazy(() => BoardCountOutputTypeCountMembersArgsObjectSchema),
				])
				.optional(),
			invitations: z
				.union([
					z.boolean(),
					z.lazy(() => BoardCountOutputTypeCountInvitationsArgsObjectSchema),
				])
				.optional(),
			chatrooms: z
				.union([
					z.boolean(),
					z.lazy(() => BoardCountOutputTypeCountChatroomsArgsObjectSchema),
				])
				.optional(),
		})
		.strict();
export const BoardCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.BoardCountOutputTypeSelect> =
	makeSchema() as unknown as z.ZodType<Prisma.BoardCountOutputTypeSelect>;
export const BoardCountOutputTypeSelectObjectZodSchema = makeSchema();
