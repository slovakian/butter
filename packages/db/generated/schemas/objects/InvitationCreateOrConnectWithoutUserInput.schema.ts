import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { InvitationCreateWithoutUserInputObjectSchema } from "./InvitationCreateWithoutUserInput.schema";
import { InvitationUncheckedCreateWithoutUserInputObjectSchema } from "./InvitationUncheckedCreateWithoutUserInput.schema";
import { InvitationWhereUniqueInputObjectSchema } from "./InvitationWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => InvitationWhereUniqueInputObjectSchema),
			create: z.union([
				z.lazy(() => InvitationCreateWithoutUserInputObjectSchema),
				z.lazy(() => InvitationUncheckedCreateWithoutUserInputObjectSchema),
			]),
		})
		.strict();
export const InvitationCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.InvitationCreateOrConnectWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.InvitationCreateOrConnectWithoutUserInput>;
export const InvitationCreateOrConnectWithoutUserInputObjectZodSchema =
	makeSchema();
