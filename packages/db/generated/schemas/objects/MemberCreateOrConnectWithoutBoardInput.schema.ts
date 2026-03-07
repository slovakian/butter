import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { MemberCreateWithoutBoardInputObjectSchema } from "./MemberCreateWithoutBoardInput.schema";
import { MemberUncheckedCreateWithoutBoardInputObjectSchema } from "./MemberUncheckedCreateWithoutBoardInput.schema";
import { MemberWhereUniqueInputObjectSchema } from "./MemberWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => MemberWhereUniqueInputObjectSchema),
			create: z.union([
				z.lazy(() => MemberCreateWithoutBoardInputObjectSchema),
				z.lazy(() => MemberUncheckedCreateWithoutBoardInputObjectSchema),
			]),
		})
		.strict();
export const MemberCreateOrConnectWithoutBoardInputObjectSchema: z.ZodType<Prisma.MemberCreateOrConnectWithoutBoardInput> =
	makeSchema() as unknown as z.ZodType<Prisma.MemberCreateOrConnectWithoutBoardInput>;
export const MemberCreateOrConnectWithoutBoardInputObjectZodSchema =
	makeSchema();
