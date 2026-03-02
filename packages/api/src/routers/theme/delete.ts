import { z } from "zod";
import { protectedProcedure } from "../../procedures";

export const deleteTheme = protectedProcedure
	.input(
		z.object({
			id: z.number(),
		}),
	)
	.handler(async ({ input, context, errors }) => {
		const { db, auth } = context;
		const userId = Number(auth.session.user.id);

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

		if (theme.userId !== userId) {
			throw errors.FORBIDDEN({
				message: "You are not the owner of this theme",
			});
		}

		await db.theme.delete({
			where: { id: input.id },
		});

		return { success: true };
	});
