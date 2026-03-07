import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { InvitationScalarWhereInputObjectSchema } from "./InvitationScalarWhereInput.schema";
import { InvitationUncheckedUpdateManyWithoutUserInputObjectSchema } from "./InvitationUncheckedUpdateManyWithoutUserInput.schema";
import { InvitationUpdateManyMutationInputObjectSchema } from "./InvitationUpdateManyMutationInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => InvitationScalarWhereInputObjectSchema),
			data: z.union([
				z.lazy(() => InvitationUpdateManyMutationInputObjectSchema),
				z.lazy(() => InvitationUncheckedUpdateManyWithoutUserInputObjectSchema),
			]),
		})
		.strict();
export const InvitationUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.InvitationUpdateManyWithWhereWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.InvitationUpdateManyWithWhereWithoutUserInput>;
export const InvitationUpdateManyWithWhereWithoutUserInputObjectZodSchema =
	makeSchema();
