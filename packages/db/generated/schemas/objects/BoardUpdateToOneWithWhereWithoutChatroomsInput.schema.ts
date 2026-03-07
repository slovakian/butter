import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoardUncheckedUpdateWithoutChatroomsInputObjectSchema } from "./BoardUncheckedUpdateWithoutChatroomsInput.schema";
import { BoardUpdateWithoutChatroomsInputObjectSchema } from "./BoardUpdateWithoutChatroomsInput.schema";
import { BoardWhereInputObjectSchema } from "./BoardWhereInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => BoardWhereInputObjectSchema).optional(),
			data: z.union([
				z.lazy(() => BoardUpdateWithoutChatroomsInputObjectSchema),
				z.lazy(() => BoardUncheckedUpdateWithoutChatroomsInputObjectSchema),
			]),
		})
		.strict();
export const BoardUpdateToOneWithWhereWithoutChatroomsInputObjectSchema: z.ZodType<Prisma.BoardUpdateToOneWithWhereWithoutChatroomsInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BoardUpdateToOneWithWhereWithoutChatroomsInput>;
export const BoardUpdateToOneWithWhereWithoutChatroomsInputObjectZodSchema =
	makeSchema();
