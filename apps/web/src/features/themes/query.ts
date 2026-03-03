import type { Theme } from "@butter/shared";
import { useMatch } from "@tanstack/react-router";
import { useAuth } from "../auth/query";

export const useTheme = (): Theme | null => {
	const { data: session } = useAuth();

	const boardMatch = useMatch({
		from: "/_auth/b/$boardSlug",
		shouldThrow: false,
	});

	if (boardMatch) {
		return boardMatch.loaderData?.board?.theme ?? null;
	}

	return session?.user.theme ?? null;
};
