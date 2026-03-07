import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { InvitationCreateWithoutBoardInputObjectSchema } from "./InvitationCreateWithoutBoardInput.schema";
import { InvitationUncheckedCreateWithoutBoardInputObjectSchema } from "./InvitationUncheckedCreateWithoutBoardInput.schema";
import { InvitationUncheckedUpdateWithoutBoardInputObjectSchema } from "./InvitationUncheckedUpdateWithoutBoardInput.schema";
import { InvitationUpdateWithoutBoardInputObjectSchema } from "./InvitationUpdateWithoutBoardInput.schema";
import { InvitationWhereUniqueInputObjectSchema } from "./InvitationWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => InvitationWhereUniqueInputObjectSchema),
			update: z.union([
				z.lazy(() => InvitationUpdateWithoutBoardInputObjectSchema),
				z.lazy(() => InvitationUncheckedUpdateWithoutBoardInputObjectSchema),
			]),
			create: z.union([
				z.lazy(() => InvitationCreateWithoutBoardInputObjectSchema),
				z.lazy(() => InvitationUncheckedCreateWithoutBoardInputObjectSchema),
			]),
		})
		.strict();
export const InvitationUpsertWithWhereUniqueWithoutBoardInputObjectSchema: z.ZodType<Prisma.InvitationUpsertWithWhereUniqueWithoutBoardInput> =
	makeSchema() as unknown as z.ZodType<Prisma.InvitationUpsertWithWhereUniqueWithoutBoardInput>;
export const InvitationUpsertWithWhereUniqueWithoutBoardInputObjectZodSchema =
	makeSchema();
