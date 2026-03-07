import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoardCreateWithoutInvitationsInputObjectSchema } from "./BoardCreateWithoutInvitationsInput.schema";
import { BoardUncheckedCreateWithoutInvitationsInputObjectSchema } from "./BoardUncheckedCreateWithoutInvitationsInput.schema";
import { BoardWhereUniqueInputObjectSchema } from "./BoardWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => BoardWhereUniqueInputObjectSchema),
			create: z.union([
				z.lazy(() => BoardCreateWithoutInvitationsInputObjectSchema),
				z.lazy(() => BoardUncheckedCreateWithoutInvitationsInputObjectSchema),
			]),
		})
		.strict();
export const BoardCreateOrConnectWithoutInvitationsInputObjectSchema: z.ZodType<Prisma.BoardCreateOrConnectWithoutInvitationsInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BoardCreateOrConnectWithoutInvitationsInput>;
export const BoardCreateOrConnectWithoutInvitationsInputObjectZodSchema =
	makeSchema();
