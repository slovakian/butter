import type { RouterClient } from "@orpc/server";
import { boardRouter } from "./board";
import { themeRouter } from "./theme";

export const appRouter = {
	board: boardRouter,
	theme: themeRouter,
};

export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
