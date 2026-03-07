import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ThemeCreateWithoutUserInputObjectSchema } from "./ThemeCreateWithoutUserInput.schema";
import { ThemeUncheckedCreateWithoutUserInputObjectSchema } from "./ThemeUncheckedCreateWithoutUserInput.schema";
import { ThemeWhereUniqueInputObjectSchema } from "./ThemeWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => ThemeWhereUniqueInputObjectSchema),
			create: z.union([
				z.lazy(() => ThemeCreateWithoutUserInputObjectSchema),
				z.lazy(() => ThemeUncheckedCreateWithoutUserInputObjectSchema),
			]),
		})
		.strict();
export const ThemeCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.ThemeCreateOrConnectWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ThemeCreateOrConnectWithoutUserInput>;
export const ThemeCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
