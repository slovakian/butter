import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoolFilterObjectSchema } from "./BoolFilter.schema";
import { ChatroomListRelationFilterObjectSchema } from "./ChatroomListRelationFilter.schema";
import { DateTimeFilterObjectSchema } from "./DateTimeFilter.schema";
import { IntFilterObjectSchema } from "./IntFilter.schema";
import { IntNullableFilterObjectSchema } from "./IntNullableFilter.schema";
import { InvitationListRelationFilterObjectSchema } from "./InvitationListRelationFilter.schema";
import { MemberListRelationFilterObjectSchema } from "./MemberListRelationFilter.schema";
import { StringFilterObjectSchema } from "./StringFilter.schema";
import { StringNullableFilterObjectSchema } from "./StringNullableFilter.schema";
import { ThemeNullableScalarRelationFilterObjectSchema } from "./ThemeNullableScalarRelationFilter.schema";
import { ThemeWhereInputObjectSchema } from "./ThemeWhereInput.schema";

const boardwhereinputSchema = z
	.object({
		AND: z
			.union([
				z.lazy(() => BoardWhereInputObjectSchema),
				z.lazy(() => BoardWhereInputObjectSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => BoardWhereInputObjectSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => BoardWhereInputObjectSchema),
				z.lazy(() => BoardWhereInputObjectSchema).array(),
			])
			.optional(),
		id: z
			.union([z.lazy(() => IntFilterObjectSchema), z.number().int()])
			.optional(),
		name: z
			.union([z.lazy(() => StringFilterObjectSchema), z.string()])
			.optional(),
		slug: z
			.union([z.lazy(() => StringFilterObjectSchema), z.string()])
			.optional(),
		logo: z
			.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
			.optional()
			.nullable(),
		isOfficial: z
			.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
			.optional(),
		createdAt: z
			.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
			.optional(),
		metadata: z
			.union([z.lazy(() => StringFilterObjectSchema), z.string()])
			.optional(),
		themeId: z
			.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()])
			.optional()
			.nullable(),
		members: z.lazy(() => MemberListRelationFilterObjectSchema).optional(),
		invitations: z
			.lazy(() => InvitationListRelationFilterObjectSchema)
			.optional(),
		theme: z
			.union([
				z.lazy(() => ThemeNullableScalarRelationFilterObjectSchema),
				z.lazy(() => ThemeWhereInputObjectSchema),
			])
			.optional(),
		chatrooms: z.lazy(() => ChatroomListRelationFilterObjectSchema).optional(),
	})
	.strict();
export const BoardWhereInputObjectSchema: z.ZodType<Prisma.BoardWhereInput> =
	boardwhereinputSchema as unknown as z.ZodType<Prisma.BoardWhereInput>;
export const BoardWhereInputObjectZodSchema = boardwhereinputSchema;
