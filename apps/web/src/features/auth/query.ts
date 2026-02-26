import { queryOptions, useQuery } from "@tanstack/react-query";
import { authClient } from "./client";

export const authQueryOptions = queryOptions({
	queryKey: ["auth"] as const,
	queryFn: async () => {
		const result = await authClient.getSession();
		return result.data;
	},
	staleTime: Number.POSITIVE_INFINITY,
});

export const useAuth = (
	options?: Omit<
		typeof authQueryOptions,
		"queryKey" | "queryFn" | "meta" | "queryKeyHashFn" | "context"
	>,
) => {
	return useQuery({
		...authQueryOptions,
		...options,
	});
};
