import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { SortOrderSchema } from "../enums/SortOrder.schema";
import { AccountOrderByRelationAggregateInputObjectSchema } from "./AccountOrderByRelationAggregateInput.schema";
import { InvitationOrderByRelationAggregateInputObjectSchema } from "./InvitationOrderByRelationAggregateInput.schema";
import { MemberOrderByRelationAggregateInputObjectSchema } from "./MemberOrderByRelationAggregateInput.schema";
import { MessageOrderByRelationAggregateInputObjectSchema } from "./MessageOrderByRelationAggregateInput.schema";
import { SessionOrderByRelationAggregateInputObjectSchema } from "./SessionOrderByRelationAggregateInput.schema";
import { SortOrderInputObjectSchema } from "./SortOrderInput.schema";
import { ThemeOrderByRelationAggregateInputObjectSchema } from "./ThemeOrderByRelationAggregateInput.schema";

const makeSchema = () =>
	z
		.object({
			id: SortOrderSchema.optional(),
			name: SortOrderSchema.optional(),
			email: SortOrderSchema.optional(),
			emailVerified: SortOrderSchema.optional(),
			image: z
				.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
				.optional(),
			createdAt: SortOrderSchema.optional(),
			updatedAt: SortOrderSchema.optional(),
			role: z
				.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
				.optional(),
			banned: z
				.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
				.optional(),
			banReason: z
				.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
				.optional(),
			banExpires: z
				.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
				.optional(),
			isAnonymous: z
				.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
				.optional(),
			sessions: z
				.lazy(() => SessionOrderByRelationAggregateInputObjectSchema)
				.optional(),
			accounts: z
				.lazy(() => AccountOrderByRelationAggregateInputObjectSchema)
				.optional(),
			members: z
				.lazy(() => MemberOrderByRelationAggregateInputObjectSchema)
				.optional(),
			invitations: z
				.lazy(() => InvitationOrderByRelationAggregateInputObjectSchema)
				.optional(),
			themes: z
				.lazy(() => ThemeOrderByRelationAggregateInputObjectSchema)
				.optional(),
			themesUsing: z
				.lazy(() => ThemeOrderByRelationAggregateInputObjectSchema)
				.optional(),
			messages: z
				.lazy(() => MessageOrderByRelationAggregateInputObjectSchema)
				.optional(),
		})
		.strict();
export const UserOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserOrderByWithRelationInput>;
export const UserOrderByWithRelationInputObjectZodSchema = makeSchema();
