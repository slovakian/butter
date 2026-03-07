import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ChatroomUncheckedUpdateWithoutBoardInputObjectSchema } from "./ChatroomUncheckedUpdateWithoutBoardInput.schema";
import { ChatroomUpdateWithoutBoardInputObjectSchema } from "./ChatroomUpdateWithoutBoardInput.schema";
import { ChatroomWhereUniqueInputObjectSchema } from "./ChatroomWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => ChatroomWhereUniqueInputObjectSchema),
			data: z.union([
				z.lazy(() => ChatroomUpdateWithoutBoardInputObjectSchema),
				z.lazy(() => ChatroomUncheckedUpdateWithoutBoardInputObjectSchema),
			]),
		})
		.strict();
export const ChatroomUpdateWithWhereUniqueWithoutBoardInputObjectSchema: z.ZodType<Prisma.ChatroomUpdateWithWhereUniqueWithoutBoardInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ChatroomUpdateWithWhereUniqueWithoutBoardInput>;
export const ChatroomUpdateWithWhereUniqueWithoutBoardInputObjectZodSchema =
	makeSchema();
