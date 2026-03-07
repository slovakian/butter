import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ChatroomScalarWhereInputObjectSchema } from "./ChatroomScalarWhereInput.schema";
import { ChatroomUncheckedUpdateManyWithoutBoardInputObjectSchema } from "./ChatroomUncheckedUpdateManyWithoutBoardInput.schema";
import { ChatroomUpdateManyMutationInputObjectSchema } from "./ChatroomUpdateManyMutationInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => ChatroomScalarWhereInputObjectSchema),
			data: z.union([
				z.lazy(() => ChatroomUpdateManyMutationInputObjectSchema),
				z.lazy(() => ChatroomUncheckedUpdateManyWithoutBoardInputObjectSchema),
			]),
		})
		.strict();
export const ChatroomUpdateManyWithWhereWithoutBoardInputObjectSchema: z.ZodType<Prisma.ChatroomUpdateManyWithWhereWithoutBoardInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ChatroomUpdateManyWithWhereWithoutBoardInput>;
export const ChatroomUpdateManyWithWhereWithoutBoardInputObjectZodSchema =
	makeSchema();
