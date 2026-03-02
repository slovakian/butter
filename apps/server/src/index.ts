import { createContext } from "@butter/api/context";
import { appRouter } from "@butter/api/routers/index";
import { type AuthClient, createAuth } from "@butter/auth";
import { createDb, type DbClient } from "@butter/db";
import { env } from "@butter/env/server";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { onError } from "@orpc/server";
import { RPCHandler } from "@orpc/server/fetch";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { partyserverMiddleware } from "hono-party";

import { Chatroom } from "./lib/chatroom";

export { Chatroom };

const app = new Hono<{
	Variables: {
		db: DbClient;
		auth: AuthClient;
	};
	Bindings: Env;
}>();

app.use(logger());

app.use(
	"/*",
	cors({
		origin: env.CORS_ORIGIN,
		allowMethods: ["GET", "POST", "OPTIONS"],
		allowHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	}),
);

app.use("*", async (c, next) => {
	const { db, pool } = createDb();
	const auth = createAuth(db);
	c.set("db", db);
	c.set("auth", auth);

	try {
		await next();
	} finally {
		await pool.end();
	}
});

app.on(["POST", "GET"], "/api/auth/*", (c) => {
	const auth = c.get("auth");
	return auth.handler(c.req.raw);
});

export const apiHandler = new OpenAPIHandler(appRouter, {
	plugins: [
		new OpenAPIReferencePlugin({
			schemaConverters: [new ZodToJsonSchemaConverter()],
		}),
	],
	interceptors: [
		onError((error) => {
			console.error(error);
		}),
	],
});

export const rpcHandler = new RPCHandler(appRouter, {
	interceptors: [
		onError((error) => {
			console.error(error);
		}),
	],
});

app.use("/*", async (c, next) => {
	const context = await createContext({
		req: c.req.raw,
		db: c.get("db"),
		auth: c.get("auth"),
		env,
	});

	const rpcResult = await rpcHandler.handle(c.req.raw, {
		prefix: "/rpc",
		context: context,
	});

	if (rpcResult.matched) {
		return c.newResponse(rpcResult.response.body, rpcResult.response);
	}

	const apiResult = await apiHandler.handle(c.req.raw, {
		prefix: "/api-reference",
		context: context,
	});

	if (apiResult.matched) {
		return c.newResponse(apiResult.response.body, apiResult.response);
	}

	await next();
});

app.use(
	"/api/party/*",
	partyserverMiddleware({
		options: {
			prefix: "api/party",
		},
		onError: (e) => {
			console.error("Party request error:", e);
			return new Response("Internal Server Error", { status: 500 });
		},
	}),
);

app.get("/", (c) => {
	return c.text("OK");
});

export default app;
