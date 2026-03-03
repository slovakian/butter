import { z } from "zod";
import { protectedProcedure, publicProcedure } from "../../procedures";

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

export const getUserTheme = protectedProcedure.handler(async ({ context }) => {
	const theme = await context.db.user.findFirst({
		where: { id: Number(context.auth.session.user.id) },
		select: {
			themesUsing: true,
		},
	});

	return theme?.themesUsing[0];
});
