import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { UserWhereInputObjectSchema } from "./UserWhereInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => UserWhereInputObjectSchema).optional(),
		})
		.strict();
export const ThemeCountOutputTypeCountUsersUsingArgsObjectSchema = makeSchema();
export const ThemeCountOutputTypeCountUsersUsingArgsObjectZodSchema =
	makeSchema();
