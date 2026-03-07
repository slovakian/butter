import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { MemberScalarWhereInputObjectSchema } from "./MemberScalarWhereInput.schema";
import { MemberUncheckedUpdateManyWithoutUserInputObjectSchema } from "./MemberUncheckedUpdateManyWithoutUserInput.schema";
import { MemberUpdateManyMutationInputObjectSchema } from "./MemberUpdateManyMutationInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => MemberScalarWhereInputObjectSchema),
			data: z.union([
				z.lazy(() => MemberUpdateManyMutationInputObjectSchema),
				z.lazy(() => MemberUncheckedUpdateManyWithoutUserInputObjectSchema),
			]),
		})
		.strict();
export const MemberUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.MemberUpdateManyWithWhereWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.MemberUpdateManyWithWhereWithoutUserInput>;
export const MemberUpdateManyWithWhereWithoutUserInputObjectZodSchema =
	makeSchema();
