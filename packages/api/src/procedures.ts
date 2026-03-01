import type { BoardPermissions } from "@butter/auth";
import { o } from ".";
import { authMiddleware, boardPermissionsMiddleware } from "./middleware";

export const publicProcedure = o;

export const protectedProcedure = publicProcedure.use(authMiddleware);

export const boardAdminProcedure = (permissions: BoardPermissions) =>
	publicProcedure.use(boardPermissionsMiddleware(permissions));
