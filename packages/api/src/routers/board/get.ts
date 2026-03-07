import { z } from "zod";
import { publicProcedure } from "../../procedures";

export const getBySlug = publicProcedure
	.input(z.object({ slug: z.string() }))
	.handler(async ({ input, context, errors }) => {
		const userId = context.auth.session?.user.id
			? Number(context.auth.session.user.id)
			: undefined;

		const board = await context.db.board.findUnique({
			where: { slug: input.slug },
			include: {
				chatrooms: true,
				theme: true,
				members: userId
					? {
							where: {
								userId,
							},
						}
					: undefined,
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

		return board;
	});
