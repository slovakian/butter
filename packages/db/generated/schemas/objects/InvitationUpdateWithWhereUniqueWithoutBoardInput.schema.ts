import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { InvitationUncheckedUpdateWithoutBoardInputObjectSchema } from "./InvitationUncheckedUpdateWithoutBoardInput.schema";
import { InvitationUpdateWithoutBoardInputObjectSchema } from "./InvitationUpdateWithoutBoardInput.schema";
import { InvitationWhereUniqueInputObjectSchema } from "./InvitationWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => InvitationWhereUniqueInputObjectSchema),
			data: z.union([
				z.lazy(() => InvitationUpdateWithoutBoardInputObjectSchema),
				z.lazy(() => InvitationUncheckedUpdateWithoutBoardInputObjectSchema),
			]),
		})
		.strict();
export const InvitationUpdateWithWhereUniqueWithoutBoardInputObjectSchema: z.ZodType<Prisma.InvitationUpdateWithWhereUniqueWithoutBoardInput> =
	makeSchema() as unknown as z.ZodType<Prisma.InvitationUpdateWithWhereUniqueWithoutBoardInput>;
export const InvitationUpdateWithWhereUniqueWithoutBoardInputObjectZodSchema =
	makeSchema();
