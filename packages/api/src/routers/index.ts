import type { RouterClient } from "@orpc/server";
import { boardRouter } from "./board";

export const appRouter = {
	board: boardRouter,
};

export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
