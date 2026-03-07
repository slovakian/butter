import {
	queryOptions,
	useQuery,
	useSuspenseQuery,
} from "@tanstack/react-query";
// import { authClient } from "./client";
import { getAuth } from "./fns";

export const authQueryOptions = queryOptions({
	queryKey: ["auth"] as const,
	queryFn: async () => {
		const auth = await getAuth();
		return auth;
		// const result = await authClient.getSession();
		// return result.data;
	},
	staleTime: 60_000,
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

export const useAuthSuspense = (
	options?: Omit<
		typeof authQueryOptions,
		"queryKey" | "queryFn" | "meta" | "queryKeyHashFn" | "context"
	>,
) => {
	return useSuspenseQuery({
		...authQueryOptions,
		...options,
	});
};
