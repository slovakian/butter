import { z } from "zod";
import { publicProcedure } from "../../procedures";

export const getBySlug = publicProcedure
	.input(
		z.object({
			boardSlug: z.string(),
			chatroomSlug: z.string(),
		}),
	)
	.handler(async ({ input, context, errors }) => {
		const chatroom = await context.db.chatroom.findFirst({
			where: {
				slug: input.chatroomSlug,
				board: {
					slug: input.boardSlug,
				},
			},
		});

		if (!chatroom) {
			throw errors.NOT_FOUND({
				message: "Chatroom not found",
				data: {
					resource: "Chatroom",
				},
			});
		}

		return chatroom;
	});

export const chatroomRouter = {
	getBySlug,
};
