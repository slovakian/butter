import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { authClient } from "@/lib/auth-client";

export const getAuth = createServerFn({ method: "GET" }).handler(async () => {
	const result = await authClient.getSession({
		fetchOptions: {
			headers: getRequestHeaders(),
		},
	});
	return result.data;
});
