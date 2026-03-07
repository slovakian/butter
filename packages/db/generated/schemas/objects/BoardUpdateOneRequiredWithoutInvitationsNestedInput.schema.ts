import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoardCreateOrConnectWithoutInvitationsInputObjectSchema } from "./BoardCreateOrConnectWithoutInvitationsInput.schema";
import { BoardCreateWithoutInvitationsInputObjectSchema } from "./BoardCreateWithoutInvitationsInput.schema";
import { BoardUncheckedCreateWithoutInvitationsInputObjectSchema } from "./BoardUncheckedCreateWithoutInvitationsInput.schema";
import { BoardUncheckedUpdateWithoutInvitationsInputObjectSchema } from "./BoardUncheckedUpdateWithoutInvitationsInput.schema";
import { BoardUpdateToOneWithWhereWithoutInvitationsInputObjectSchema } from "./BoardUpdateToOneWithWhereWithoutInvitationsInput.schema";
import { BoardUpdateWithoutInvitationsInputObjectSchema } from "./BoardUpdateWithoutInvitationsInput.schema";
import { BoardUpsertWithoutInvitationsInputObjectSchema } from "./BoardUpsertWithoutInvitationsInput.schema";
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
			upsert: z
				.lazy(() => BoardUpsertWithoutInvitationsInputObjectSchema)
				.optional(),
			connect: z.lazy(() => BoardWhereUniqueInputObjectSchema).optional(),
			update: z
				.union([
					z.lazy(
						() => BoardUpdateToOneWithWhereWithoutInvitationsInputObjectSchema,
					),
					z.lazy(() => BoardUpdateWithoutInvitationsInputObjectSchema),
					z.lazy(() => BoardUncheckedUpdateWithoutInvitationsInputObjectSchema),
				])
				.optional(),
		})
		.strict();
export const BoardUpdateOneRequiredWithoutInvitationsNestedInputObjectSchema: z.ZodType<Prisma.BoardUpdateOneRequiredWithoutInvitationsNestedInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BoardUpdateOneRequiredWithoutInvitationsNestedInput>;
export const BoardUpdateOneRequiredWithoutInvitationsNestedInputObjectZodSchema =
	makeSchema();
