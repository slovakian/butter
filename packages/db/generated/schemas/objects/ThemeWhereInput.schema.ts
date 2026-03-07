import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoardListRelationFilterObjectSchema } from "./BoardListRelationFilter.schema";
import { BoolFilterObjectSchema } from "./BoolFilter.schema";
import { DateTimeFilterObjectSchema } from "./DateTimeFilter.schema";
import { IntFilterObjectSchema } from "./IntFilter.schema";
import { IntNullableFilterObjectSchema } from "./IntNullableFilter.schema";
import { JsonFilterObjectSchema } from "./JsonFilter.schema";
import { StringFilterObjectSchema } from "./StringFilter.schema";
import { UserListRelationFilterObjectSchema } from "./UserListRelationFilter.schema";
import { UserNullableScalarRelationFilterObjectSchema } from "./UserNullableScalarRelationFilter.schema";
import { UserWhereInputObjectSchema } from "./UserWhereInput.schema";

const themewhereinputSchema = z
	.object({
		AND: z
			.union([
				z.lazy(() => ThemeWhereInputObjectSchema),
				z.lazy(() => ThemeWhereInputObjectSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => ThemeWhereInputObjectSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => ThemeWhereInputObjectSchema),
				z.lazy(() => ThemeWhereInputObjectSchema).array(),
			])
			.optional(),
		id: z
			.union([z.lazy(() => IntFilterObjectSchema), z.number().int()])
			.optional(),
		name: z
			.union([z.lazy(() => StringFilterObjectSchema), z.string()])
			.optional(),
		isDark: z
			.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
			.optional(),
		variables: z.lazy(() => JsonFilterObjectSchema).optional(),
		createdAt: z
			.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
			.optional(),
		updatedAt: z
			.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
			.optional(),
		userId: z
			.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()])
			.optional()
			.nullable(),
		user: z
			.union([
				z.lazy(() => UserNullableScalarRelationFilterObjectSchema),
				z.lazy(() => UserWhereInputObjectSchema),
			])
			.optional(),
		usersUsing: z.lazy(() => UserListRelationFilterObjectSchema).optional(),
		boardsUsing: z.lazy(() => BoardListRelationFilterObjectSchema).optional(),
	})
	.strict();
export const ThemeWhereInputObjectSchema: z.ZodType<Prisma.ThemeWhereInput> =
	themewhereinputSchema as unknown as z.ZodType<Prisma.ThemeWhereInput>;
export const ThemeWhereInputObjectZodSchema = themewhereinputSchema;
