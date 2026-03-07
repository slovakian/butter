import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { MemberCreateWithoutBoardInputObjectSchema } from "./MemberCreateWithoutBoardInput.schema";
import { MemberUncheckedCreateWithoutBoardInputObjectSchema } from "./MemberUncheckedCreateWithoutBoardInput.schema";
import { MemberUncheckedUpdateWithoutBoardInputObjectSchema } from "./MemberUncheckedUpdateWithoutBoardInput.schema";
import { MemberUpdateWithoutBoardInputObjectSchema } from "./MemberUpdateWithoutBoardInput.schema";
import { MemberWhereUniqueInputObjectSchema } from "./MemberWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => MemberWhereUniqueInputObjectSchema),
			update: z.union([
				z.lazy(() => MemberUpdateWithoutBoardInputObjectSchema),
				z.lazy(() => MemberUncheckedUpdateWithoutBoardInputObjectSchema),
			]),
			create: z.union([
				z.lazy(() => MemberCreateWithoutBoardInputObjectSchema),
				z.lazy(() => MemberUncheckedCreateWithoutBoardInputObjectSchema),
			]),
		})
		.strict();
export const MemberUpsertWithWhereUniqueWithoutBoardInputObjectSchema: z.ZodType<Prisma.MemberUpsertWithWhereUniqueWithoutBoardInput> =
	makeSchema() as unknown as z.ZodType<Prisma.MemberUpsertWithWhereUniqueWithoutBoardInput>;
export const MemberUpsertWithWhereUniqueWithoutBoardInputObjectZodSchema =
	makeSchema();
