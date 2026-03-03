import type { AuthClient } from "@butter/auth";
import { env } from "@butter/env/web";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { adminClient, customSessionClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const authOptions = {
	baseURL: env.VITE_SERVER_URL,
	plugins: [customSessionClient<AuthClient>(), adminClient()],
};

const getAuthClient = createIsomorphicFn()
	.server(() => {
		return createAuthClient({
			...authOptions,
			fetchOptions: {
				headers: getRequestHeaders(),
			},
		});
	})
	.client(() => createAuthClient(authOptions));

export const authClient = getAuthClient();
