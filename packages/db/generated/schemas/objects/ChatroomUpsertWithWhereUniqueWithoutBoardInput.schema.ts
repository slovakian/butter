import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ChatroomCreateWithoutBoardInputObjectSchema } from "./ChatroomCreateWithoutBoardInput.schema";
import { ChatroomUncheckedCreateWithoutBoardInputObjectSchema } from "./ChatroomUncheckedCreateWithoutBoardInput.schema";
import { ChatroomUncheckedUpdateWithoutBoardInputObjectSchema } from "./ChatroomUncheckedUpdateWithoutBoardInput.schema";
import { ChatroomUpdateWithoutBoardInputObjectSchema } from "./ChatroomUpdateWithoutBoardInput.schema";
import { ChatroomWhereUniqueInputObjectSchema } from "./ChatroomWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => ChatroomWhereUniqueInputObjectSchema),
			update: z.union([
				z.lazy(() => ChatroomUpdateWithoutBoardInputObjectSchema),
				z.lazy(() => ChatroomUncheckedUpdateWithoutBoardInputObjectSchema),
			]),
			create: z.union([
				z.lazy(() => ChatroomCreateWithoutBoardInputObjectSchema),
				z.lazy(() => ChatroomUncheckedCreateWithoutBoardInputObjectSchema),
			]),
		})
		.strict();
export const ChatroomUpsertWithWhereUniqueWithoutBoardInputObjectSchema: z.ZodType<Prisma.ChatroomUpsertWithWhereUniqueWithoutBoardInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ChatroomUpsertWithWhereUniqueWithoutBoardInput>;
export const ChatroomUpsertWithWhereUniqueWithoutBoardInputObjectZodSchema =
	makeSchema();
