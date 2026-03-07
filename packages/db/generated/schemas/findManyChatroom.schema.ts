import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { ChatroomScalarFieldEnumSchema } from "./enums/ChatroomScalarFieldEnum.schema";
import { ChatroomIncludeObjectSchema } from "./objects/ChatroomInclude.schema";
import { ChatroomOrderByWithRelationInputObjectSchema } from "./objects/ChatroomOrderByWithRelationInput.schema";
import { ChatroomWhereInputObjectSchema } from "./objects/ChatroomWhereInput.schema";
import { ChatroomWhereUniqueInputObjectSchema } from "./objects/ChatroomWhereUniqueInput.schema";

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ChatroomFindManySelectSchema: z.ZodType<Prisma.ChatroomSelect> = z
	.object({
		id: z.boolean().optional(),
		name: z.boolean().optional(),
		slug: z.boolean().optional(),
		boardId: z.boolean().optional(),
		board: z.boolean().optional(),
		messages: z.boolean().optional(),
		_count: z.boolean().optional(),
	})
	.strict() as unknown as z.ZodType<Prisma.ChatroomSelect>;

export const ChatroomFindManySelectZodSchema = z
	.object({
		id: z.boolean().optional(),
		name: z.boolean().optional(),
		slug: z.boolean().optional(),
		boardId: z.boolean().optional(),
		board: z.boolean().optional(),
		messages: z.boolean().optional(),
		_count: z.boolean().optional(),
	})
	.strict();

export const ChatroomFindManySchema: z.ZodType<Prisma.ChatroomFindManyArgs> = z
	.object({
		select: ChatroomFindManySelectSchema.optional(),
		include: z.lazy(() => ChatroomIncludeObjectSchema.optional()),
		orderBy: z
			.union([
				ChatroomOrderByWithRelationInputObjectSchema,
				ChatroomOrderByWithRelationInputObjectSchema.array(),
			])
			.optional(),
		where: ChatroomWhereInputObjectSchema.optional(),
		cursor: ChatroomWhereUniqueInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([
				ChatroomScalarFieldEnumSchema,
				ChatroomScalarFieldEnumSchema.array(),
			])
			.optional(),
	})
	.strict() as unknown as z.ZodType<Prisma.ChatroomFindManyArgs>;

export const ChatroomFindManyZodSchema = z
	.object({
		select: ChatroomFindManySelectSchema.optional(),
		include: z.lazy(() => ChatroomIncludeObjectSchema.optional()),
		orderBy: z
			.union([
				ChatroomOrderByWithRelationInputObjectSchema,
				ChatroomOrderByWithRelationInputObjectSchema.array(),
			])
			.optional(),
		where: ChatroomWhereInputObjectSchema.optional(),
		cursor: ChatroomWhereUniqueInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([
				ChatroomScalarFieldEnumSchema,
				ChatroomScalarFieldEnumSchema.array(),
			])
			.optional(),
	})
	.strict();
