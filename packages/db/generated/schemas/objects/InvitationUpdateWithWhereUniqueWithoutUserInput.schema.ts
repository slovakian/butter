import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { InvitationUncheckedUpdateWithoutUserInputObjectSchema } from "./InvitationUncheckedUpdateWithoutUserInput.schema";
import { InvitationUpdateWithoutUserInputObjectSchema } from "./InvitationUpdateWithoutUserInput.schema";
import { InvitationWhereUniqueInputObjectSchema } from "./InvitationWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => InvitationWhereUniqueInputObjectSchema),
			data: z.union([
				z.lazy(() => InvitationUpdateWithoutUserInputObjectSchema),
				z.lazy(() => InvitationUncheckedUpdateWithoutUserInputObjectSchema),
			]),
		})
		.strict();
export const InvitationUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.InvitationUpdateWithWhereUniqueWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.InvitationUpdateWithWhereUniqueWithoutUserInput>;
export const InvitationUpdateWithWhereUniqueWithoutUserInputObjectZodSchema =
	makeSchema();
