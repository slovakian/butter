import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { MessageWhereInputObjectSchema } from "./MessageWhereInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => MessageWhereInputObjectSchema).optional(),
		})
		.strict();
export const UserCountOutputTypeCountMessagesArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountMessagesArgsObjectZodSchema = makeSchema();
