import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { InvitationScalarWhereInputObjectSchema } from "./InvitationScalarWhereInput.schema";
import { InvitationUncheckedUpdateManyWithoutBoardInputObjectSchema } from "./InvitationUncheckedUpdateManyWithoutBoardInput.schema";
import { InvitationUpdateManyMutationInputObjectSchema } from "./InvitationUpdateManyMutationInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => InvitationScalarWhereInputObjectSchema),
			data: z.union([
				z.lazy(() => InvitationUpdateManyMutationInputObjectSchema),
				z.lazy(
					() => InvitationUncheckedUpdateManyWithoutBoardInputObjectSchema,
				),
			]),
		})
		.strict();
export const InvitationUpdateManyWithWhereWithoutBoardInputObjectSchema: z.ZodType<Prisma.InvitationUpdateManyWithWhereWithoutBoardInput> =
	makeSchema() as unknown as z.ZodType<Prisma.InvitationUpdateManyWithWhereWithoutBoardInput>;
export const InvitationUpdateManyWithWhereWithoutBoardInputObjectZodSchema =
	makeSchema();
