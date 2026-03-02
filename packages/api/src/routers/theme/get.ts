import { z } from "zod";
import { publicProcedure } from "../../procedures";

export const getTheme = publicProcedure
	.input(
		z.object({
			id: z.number(),
		}),
	)
	.handler(async ({ input, context, errors }) => {
		const { db } = context;

		const theme = await db.theme.findUnique({
			where: { id: input.id },
		});

		if (!theme) {
			throw errors.NOT_FOUND({
				message: "Theme not found",
				data: {
					resource: "Theme",
				},
			});
		}

		return theme;
	});
