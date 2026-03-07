import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { MemberUncheckedUpdateWithoutBoardInputObjectSchema } from "./MemberUncheckedUpdateWithoutBoardInput.schema";
import { MemberUpdateWithoutBoardInputObjectSchema } from "./MemberUpdateWithoutBoardInput.schema";
import { MemberWhereUniqueInputObjectSchema } from "./MemberWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => MemberWhereUniqueInputObjectSchema),
			data: z.union([
				z.lazy(() => MemberUpdateWithoutBoardInputObjectSchema),
				z.lazy(() => MemberUncheckedUpdateWithoutBoardInputObjectSchema),
			]),
		})
		.strict();
export const MemberUpdateWithWhereUniqueWithoutBoardInputObjectSchema: z.ZodType<Prisma.MemberUpdateWithWhereUniqueWithoutBoardInput> =
	makeSchema() as unknown as z.ZodType<Prisma.MemberUpdateWithWhereUniqueWithoutBoardInput>;
export const MemberUpdateWithWhereUniqueWithoutBoardInputObjectZodSchema =
	makeSchema();
