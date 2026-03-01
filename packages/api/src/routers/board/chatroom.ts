import { ORPCError } from "@orpc/server";
import { z } from "zod";
import { publicProcedure } from "../../procedures";

export const getBySlug = publicProcedure
	.input(
		z.object({
			boardSlug: z.string(),
			chatroomSlug: z.string(),
		}),
	)
	.handler(async ({ input, context }) => {
		const chatroom = await context.db.chatroom.findFirst({
			where: {
				slug: input.chatroomSlug,
				board: {
					slug: input.boardSlug,
				},
			},
		});

		if (!chatroom) {
			throw new ORPCError("NOT_FOUND", {
				message: "Chatroom not found",
			});
		}

		return chatroom;
	});

export const chatroomRouter = {
	getBySlug,
};
