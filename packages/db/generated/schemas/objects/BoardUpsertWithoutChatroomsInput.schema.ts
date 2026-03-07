import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoardCreateWithoutChatroomsInputObjectSchema } from "./BoardCreateWithoutChatroomsInput.schema";
import { BoardUncheckedCreateWithoutChatroomsInputObjectSchema } from "./BoardUncheckedCreateWithoutChatroomsInput.schema";
import { BoardUncheckedUpdateWithoutChatroomsInputObjectSchema } from "./BoardUncheckedUpdateWithoutChatroomsInput.schema";
import { BoardUpdateWithoutChatroomsInputObjectSchema } from "./BoardUpdateWithoutChatroomsInput.schema";
import { BoardWhereInputObjectSchema } from "./BoardWhereInput.schema";

const makeSchema = () =>
	z
		.object({
			update: z.union([
				z.lazy(() => BoardUpdateWithoutChatroomsInputObjectSchema),
				z.lazy(() => BoardUncheckedUpdateWithoutChatroomsInputObjectSchema),
			]),
			create: z.union([
				z.lazy(() => BoardCreateWithoutChatroomsInputObjectSchema),
				z.lazy(() => BoardUncheckedCreateWithoutChatroomsInputObjectSchema),
			]),
			where: z.lazy(() => BoardWhereInputObjectSchema).optional(),
		})
		.strict();
export const BoardUpsertWithoutChatroomsInputObjectSchema: z.ZodType<Prisma.BoardUpsertWithoutChatroomsInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BoardUpsertWithoutChatroomsInput>;
export const BoardUpsertWithoutChatroomsInputObjectZodSchema = makeSchema();
