import { o } from ".";
import { authMiddleware, rateLimiterMiddleware } from "./middleware";

export const publicProcedure = o;
export const protectedProcedure = publicProcedure
	.use(rateLimiterMiddleware)
	.use(authMiddleware);
