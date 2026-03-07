import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { IntWithAggregatesFilterObjectSchema } from "./IntWithAggregatesFilter.schema";
import { StringWithAggregatesFilterObjectSchema } from "./StringWithAggregatesFilter.schema";

const messagescalarwherewithaggregatesinputSchema = z
	.object({
		AND: z
			.union([
				z.lazy(() => MessageScalarWhereWithAggregatesInputObjectSchema),
				z.lazy(() => MessageScalarWhereWithAggregatesInputObjectSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => MessageScalarWhereWithAggregatesInputObjectSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => MessageScalarWhereWithAggregatesInputObjectSchema),
				z.lazy(() => MessageScalarWhereWithAggregatesInputObjectSchema).array(),
			])
			.optional(),
		id: z
			.union([
				z.lazy(() => IntWithAggregatesFilterObjectSchema),
				z.number().int(),
			])
			.optional(),
		content: z
			.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
			.optional(),
		pageNumber: z
			.union([
				z.lazy(() => IntWithAggregatesFilterObjectSchema),
				z.number().int(),
			])
			.optional(),
		chatroomId: z
			.union([
				z.lazy(() => IntWithAggregatesFilterObjectSchema),
				z.number().int(),
			])
			.optional(),
		userId: z
			.union([
				z.lazy(() => IntWithAggregatesFilterObjectSchema),
				z.number().int(),
			])
			.optional(),
	})
	.strict();
export const MessageScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.MessageScalarWhereWithAggregatesInput> =
	messagescalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.MessageScalarWhereWithAggregatesInput>;
export const MessageScalarWhereWithAggregatesInputObjectZodSchema =
	messagescalarwherewithaggregatesinputSchema;
