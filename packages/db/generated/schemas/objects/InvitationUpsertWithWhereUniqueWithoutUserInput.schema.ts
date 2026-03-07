import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { InvitationCreateWithoutUserInputObjectSchema } from "./InvitationCreateWithoutUserInput.schema";
import { InvitationUncheckedCreateWithoutUserInputObjectSchema } from "./InvitationUncheckedCreateWithoutUserInput.schema";
import { InvitationUncheckedUpdateWithoutUserInputObjectSchema } from "./InvitationUncheckedUpdateWithoutUserInput.schema";
import { InvitationUpdateWithoutUserInputObjectSchema } from "./InvitationUpdateWithoutUserInput.schema";
import { InvitationWhereUniqueInputObjectSchema } from "./InvitationWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => InvitationWhereUniqueInputObjectSchema),
			update: z.union([
				z.lazy(() => InvitationUpdateWithoutUserInputObjectSchema),
				z.lazy(() => InvitationUncheckedUpdateWithoutUserInputObjectSchema),
			]),
			create: z.union([
				z.lazy(() => InvitationCreateWithoutUserInputObjectSchema),
				z.lazy(() => InvitationUncheckedCreateWithoutUserInputObjectSchema),
			]),
		})
		.strict();
export const InvitationUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.InvitationUpsertWithWhereUniqueWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.InvitationUpsertWithWhereUniqueWithoutUserInput>;
export const InvitationUpsertWithWhereUniqueWithoutUserInputObjectZodSchema =
	makeSchema();
