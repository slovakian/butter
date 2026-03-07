import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoardCreateWithoutChatroomsInputObjectSchema } from "./BoardCreateWithoutChatroomsInput.schema";
import { BoardUncheckedCreateWithoutChatroomsInputObjectSchema } from "./BoardUncheckedCreateWithoutChatroomsInput.schema";
import { BoardWhereUniqueInputObjectSchema } from "./BoardWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => BoardWhereUniqueInputObjectSchema),
			create: z.union([
				z.lazy(() => BoardCreateWithoutChatroomsInputObjectSchema),
				z.lazy(() => BoardUncheckedCreateWithoutChatroomsInputObjectSchema),
			]),
		})
		.strict();
export const BoardCreateOrConnectWithoutChatroomsInputObjectSchema: z.ZodType<Prisma.BoardCreateOrConnectWithoutChatroomsInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BoardCreateOrConnectWithoutChatroomsInput>;
export const BoardCreateOrConnectWithoutChatroomsInputObjectZodSchema =
	makeSchema();
