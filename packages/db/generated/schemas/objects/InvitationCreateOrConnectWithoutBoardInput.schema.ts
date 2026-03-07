import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { InvitationCreateWithoutBoardInputObjectSchema } from "./InvitationCreateWithoutBoardInput.schema";
import { InvitationUncheckedCreateWithoutBoardInputObjectSchema } from "./InvitationUncheckedCreateWithoutBoardInput.schema";
import { InvitationWhereUniqueInputObjectSchema } from "./InvitationWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => InvitationWhereUniqueInputObjectSchema),
			create: z.union([
				z.lazy(() => InvitationCreateWithoutBoardInputObjectSchema),
				z.lazy(() => InvitationUncheckedCreateWithoutBoardInputObjectSchema),
			]),
		})
		.strict();
export const InvitationCreateOrConnectWithoutBoardInputObjectSchema: z.ZodType<Prisma.InvitationCreateOrConnectWithoutBoardInput> =
	makeSchema() as unknown as z.ZodType<Prisma.InvitationCreateOrConnectWithoutBoardInput>;
export const InvitationCreateOrConnectWithoutBoardInputObjectZodSchema =
	makeSchema();
