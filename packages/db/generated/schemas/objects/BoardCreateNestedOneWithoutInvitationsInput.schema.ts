import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoardCreateOrConnectWithoutInvitationsInputObjectSchema } from "./BoardCreateOrConnectWithoutInvitationsInput.schema";
import { BoardCreateWithoutInvitationsInputObjectSchema } from "./BoardCreateWithoutInvitationsInput.schema";
import { BoardUncheckedCreateWithoutInvitationsInputObjectSchema } from "./BoardUncheckedCreateWithoutInvitationsInput.schema";
import { BoardWhereUniqueInputObjectSchema } from "./BoardWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			create: z
				.union([
					z.lazy(() => BoardCreateWithoutInvitationsInputObjectSchema),
					z.lazy(() => BoardUncheckedCreateWithoutInvitationsInputObjectSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => BoardCreateOrConnectWithoutInvitationsInputObjectSchema)
				.optional(),
			connect: z.lazy(() => BoardWhereUniqueInputObjectSchema).optional(),
		})
		.strict();
export const BoardCreateNestedOneWithoutInvitationsInputObjectSchema: z.ZodType<Prisma.BoardCreateNestedOneWithoutInvitationsInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BoardCreateNestedOneWithoutInvitationsInput>;
export const BoardCreateNestedOneWithoutInvitationsInputObjectZodSchema =
	makeSchema();
