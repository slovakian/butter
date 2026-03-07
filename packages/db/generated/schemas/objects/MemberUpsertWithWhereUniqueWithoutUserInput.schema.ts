import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { MemberCreateWithoutUserInputObjectSchema } from "./MemberCreateWithoutUserInput.schema";
import { MemberUncheckedCreateWithoutUserInputObjectSchema } from "./MemberUncheckedCreateWithoutUserInput.schema";
import { MemberUncheckedUpdateWithoutUserInputObjectSchema } from "./MemberUncheckedUpdateWithoutUserInput.schema";
import { MemberUpdateWithoutUserInputObjectSchema } from "./MemberUpdateWithoutUserInput.schema";
import { MemberWhereUniqueInputObjectSchema } from "./MemberWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => MemberWhereUniqueInputObjectSchema),
			update: z.union([
				z.lazy(() => MemberUpdateWithoutUserInputObjectSchema),
				z.lazy(() => MemberUncheckedUpdateWithoutUserInputObjectSchema),
			]),
			create: z.union([
				z.lazy(() => MemberCreateWithoutUserInputObjectSchema),
				z.lazy(() => MemberUncheckedCreateWithoutUserInputObjectSchema),
			]),
		})
		.strict();
export const MemberUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.MemberUpsertWithWhereUniqueWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.MemberUpsertWithWhereUniqueWithoutUserInput>;
export const MemberUpsertWithWhereUniqueWithoutUserInputObjectZodSchema =
	makeSchema();
