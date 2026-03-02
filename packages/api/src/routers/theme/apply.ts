import { z } from "zod";
import { protectedProcedure } from "../../procedures";

export const applyThemeToUser = protectedProcedure
	.input(
		z.object({
			themeId: z.number(),
		}),
	)
	.handler(async ({ input, context, errors }) => {
		const { db, auth } = context;
		const userId = Number(auth.session.user.id);

		const theme = await db.theme.findUnique({
			where: { id: input.themeId },
		});

		if (!theme) {
			throw errors.NOT_FOUND({
				message: "Theme not found",
				data: {
					resource: "Theme",
				},
			});
		}

		await db.user.update({
			where: { id: userId },
			data: {
				themesUsing: {
					set: [],
					connect: { id: input.themeId },
				},
			},
		});

		return { success: true };
	});

export const applyThemeToBoard = protectedProcedure
	.input(
		z.object({
			boardId: z.number(),
			themeId: z.number(),
		}),
	)
	.handler(async ({ input, context, errors }) => {
		const { db, auth } = context;
		const userId = Number(auth.session.user.id);

		const board = await db.board.findUnique({
			where: { id: input.boardId },
			select: {
				id: true,
				members: {
					where: {
						userId: userId,
						role: { in: ["admin", "owner"] },
					},
					select: { id: true },
				},
			},
		});

		if (!board) {
			throw errors.NOT_FOUND({
				message: "Board not found",
				data: {
					resource: "Board",
				},
			});
		}

		if (board.members.length === 0) {
			throw errors.FORBIDDEN();
		}

		const theme = await db.theme.findUnique({
			where: { id: input.themeId },
			select: { id: true },
		});

		if (!theme) {
			throw errors.NOT_FOUND({
				message: "Theme not found",
				data: {
					resource: "Theme",
				},
			});
		}

		await db.board.update({
			where: { id: input.boardId },
			data: {
				themeId: input.themeId,
			},
		});

		return { success: true };
	});
