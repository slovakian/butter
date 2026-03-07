import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { SortOrderSchema } from "../enums/SortOrder.schema";
import { BoardOrderByWithRelationInputObjectSchema } from "./BoardOrderByWithRelationInput.schema";
import { SortOrderInputObjectSchema } from "./SortOrderInput.schema";
import { UserOrderByWithRelationInputObjectSchema } from "./UserOrderByWithRelationInput.schema";

const makeSchema = () =>
	z
		.object({
			id: SortOrderSchema.optional(),
			boardId: SortOrderSchema.optional(),
			email: SortOrderSchema.optional(),
			role: z
				.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
				.optional(),
			status: SortOrderSchema.optional(),
			expiresAt: SortOrderSchema.optional(),
			createdAt: SortOrderSchema.optional(),
			inviterId: SortOrderSchema.optional(),
			board: z.lazy(() => BoardOrderByWithRelationInputObjectSchema).optional(),
			user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
		})
		.strict();
export const InvitationOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.InvitationOrderByWithRelationInput> =
	makeSchema() as unknown as z.ZodType<Prisma.InvitationOrderByWithRelationInput>;
export const InvitationOrderByWithRelationInputObjectZodSchema = makeSchema();
