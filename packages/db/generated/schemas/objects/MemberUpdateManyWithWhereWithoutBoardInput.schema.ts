import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { MemberScalarWhereInputObjectSchema } from "./MemberScalarWhereInput.schema";
import { MemberUncheckedUpdateManyWithoutBoardInputObjectSchema } from "./MemberUncheckedUpdateManyWithoutBoardInput.schema";
import { MemberUpdateManyMutationInputObjectSchema } from "./MemberUpdateManyMutationInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => MemberScalarWhereInputObjectSchema),
			data: z.union([
				z.lazy(() => MemberUpdateManyMutationInputObjectSchema),
				z.lazy(() => MemberUncheckedUpdateManyWithoutBoardInputObjectSchema),
			]),
		})
		.strict();
export const MemberUpdateManyWithWhereWithoutBoardInputObjectSchema: z.ZodType<Prisma.MemberUpdateManyWithWhereWithoutBoardInput> =
	makeSchema() as unknown as z.ZodType<Prisma.MemberUpdateManyWithWhereWithoutBoardInput>;
export const MemberUpdateManyWithWhereWithoutBoardInputObjectZodSchema =
	makeSchema();
