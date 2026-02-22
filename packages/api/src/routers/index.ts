import type { RouterClient } from "@orpc/server";
import z from "zod";

import { protectedProcedure, publicProcedure } from "../index";
import { todoRouter } from "./todo";

export const appRouter = {
	healthCheck: publicProcedure.handler(() => {
		return "OK";
	}),
	test: publicProcedure
		.input(
			z.object({
				message: z.string(),
			}),
		)
		.handler(async ({ input }) => {
			return {
				message: input.message,
				timestamp: new Date().toISOString(),
			};
		}),
	privateData: protectedProcedure.handler(({ context }) => {
		return {
			message: "This is private",
			user: context.session?.user,
		};
	}),
	todo: todoRouter,
};
export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
