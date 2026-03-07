import type { AuthClient } from "@butter/auth";
import { env } from "@butter/env/web";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getCookie, getRequestHeaders } from "@tanstack/react-start/server";
import {
	adminClient,
	anonymousClient,
	customSessionClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const authOptions = {
	baseURL: env.VITE_SERVER_URL,
	plugins: [
		customSessionClient<AuthClient>(),
		adminClient(),
		anonymousClient(),
	],
};

const getAuthClient = createIsomorphicFn()
	.server(() => {
		console.log("server: getAuthClient called, headers", getRequestHeaders());
		console.log(
			"server: getAuthClient called, session cookie",
			getCookie("butt3r.session_token"),
		);
		return createAuthClient({
			...authOptions,
			fetchOptions: {
				headers: getRequestHeaders(),
				credentials: "include",
			},
		});
	})
	.client(() =>
		createAuthClient({
			...authOptions,
		}),
	);

export const authClient = getAuthClient();
