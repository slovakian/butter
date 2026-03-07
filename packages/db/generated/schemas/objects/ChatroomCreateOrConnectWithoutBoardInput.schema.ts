import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ChatroomCreateWithoutBoardInputObjectSchema } from "./ChatroomCreateWithoutBoardInput.schema";
import { ChatroomUncheckedCreateWithoutBoardInputObjectSchema } from "./ChatroomUncheckedCreateWithoutBoardInput.schema";
import { ChatroomWhereUniqueInputObjectSchema } from "./ChatroomWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => ChatroomWhereUniqueInputObjectSchema),
			create: z.union([
				z.lazy(() => ChatroomCreateWithoutBoardInputObjectSchema),
				z.lazy(() => ChatroomUncheckedCreateWithoutBoardInputObjectSchema),
			]),
		})
		.strict();
export const ChatroomCreateOrConnectWithoutBoardInputObjectSchema: z.ZodType<Prisma.ChatroomCreateOrConnectWithoutBoardInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ChatroomCreateOrConnectWithoutBoardInput>;
export const ChatroomCreateOrConnectWithoutBoardInputObjectZodSchema =
	makeSchema();
