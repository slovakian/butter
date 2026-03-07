import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoardUncheckedUpdateWithoutMembersInputObjectSchema } from "./BoardUncheckedUpdateWithoutMembersInput.schema";
import { BoardUpdateWithoutMembersInputObjectSchema } from "./BoardUpdateWithoutMembersInput.schema";
import { BoardWhereInputObjectSchema } from "./BoardWhereInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => BoardWhereInputObjectSchema).optional(),
			data: z.union([
				z.lazy(() => BoardUpdateWithoutMembersInputObjectSchema),
				z.lazy(() => BoardUncheckedUpdateWithoutMembersInputObjectSchema),
			]),
		})
		.strict();
export const BoardUpdateToOneWithWhereWithoutMembersInputObjectSchema: z.ZodType<Prisma.BoardUpdateToOneWithWhereWithoutMembersInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BoardUpdateToOneWithWhereWithoutMembersInput>;
export const BoardUpdateToOneWithWhereWithoutMembersInputObjectZodSchema =
	makeSchema();
