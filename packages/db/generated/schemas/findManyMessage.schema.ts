import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { MessageScalarFieldEnumSchema } from "./enums/MessageScalarFieldEnum.schema";
import { MessageIncludeObjectSchema } from "./objects/MessageInclude.schema";
import { MessageOrderByWithRelationInputObjectSchema } from "./objects/MessageOrderByWithRelationInput.schema";
import { MessageWhereInputObjectSchema } from "./objects/MessageWhereInput.schema";
import { MessageWhereUniqueInputObjectSchema } from "./objects/MessageWhereUniqueInput.schema";

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const MessageFindManySelectSchema: z.ZodType<Prisma.MessageSelect> = z
	.object({
		id: z.boolean().optional(),
		content: z.boolean().optional(),
		pageNumber: z.boolean().optional(),
		chatroomId: z.boolean().optional(),
		chatroom: z.boolean().optional(),
		userId: z.boolean().optional(),
		user: z.boolean().optional(),
	})
	.strict() as unknown as z.ZodType<Prisma.MessageSelect>;

export const MessageFindManySelectZodSchema = z
	.object({
		id: z.boolean().optional(),
		content: z.boolean().optional(),
		pageNumber: z.boolean().optional(),
		chatroomId: z.boolean().optional(),
		chatroom: z.boolean().optional(),
		userId: z.boolean().optional(),
		user: z.boolean().optional(),
	})
	.strict();

export const MessageFindManySchema: z.ZodType<Prisma.MessageFindManyArgs> = z
	.object({
		select: MessageFindManySelectSchema.optional(),
		include: z.lazy(() => MessageIncludeObjectSchema.optional()),
		orderBy: z
			.union([
				MessageOrderByWithRelationInputObjectSchema,
				MessageOrderByWithRelationInputObjectSchema.array(),
			])
			.optional(),
		where: MessageWhereInputObjectSchema.optional(),
		cursor: MessageWhereUniqueInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([
				MessageScalarFieldEnumSchema,
				MessageScalarFieldEnumSchema.array(),
			])
			.optional(),
	})
	.strict() as unknown as z.ZodType<Prisma.MessageFindManyArgs>;

export const MessageFindManyZodSchema = z
	.object({
		select: MessageFindManySelectSchema.optional(),
		include: z.lazy(() => MessageIncludeObjectSchema.optional()),
		orderBy: z
			.union([
				MessageOrderByWithRelationInputObjectSchema,
				MessageOrderByWithRelationInputObjectSchema.array(),
			])
			.optional(),
		where: MessageWhereInputObjectSchema.optional(),
		cursor: MessageWhereUniqueInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([
				MessageScalarFieldEnumSchema,
				MessageScalarFieldEnumSchema.array(),
			])
			.optional(),
	})
	.strict();
