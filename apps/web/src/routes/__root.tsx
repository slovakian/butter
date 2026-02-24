import type { QueryClient } from "@tanstack/react-query";

// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
	useMatches,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "@/components/ui/sonner";
import { buildThemeStyles } from "@/features/themes/utils";
import { cn } from "@/lib/utils";
import type { orpc } from "@/utils/orpc";
import appCss from "../index.css?url";

export interface RouterAppContext {
	orpc: typeof orpc;
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Butt3r",
			},
		],
		links: [
			{
				rel: "icon",
				href: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🧈</text></svg>',
			},
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),

	component: RootDocument,
});

function RootDocument() {
	const matches = useMatches();
	const spaceMatch = matches.find((m) => m.routeId === "/_auth/$spaceId");
	const activeTheme = spaceMatch?.loaderData?.spaceThemeData;

	return (
		<html
			lang="en"
			className={cn(activeTheme?.isDark ? "dark" : undefined)}
			style={activeTheme ? buildThemeStyles(activeTheme.variables) : undefined}
		>
			<head>
				<HeadContent />
			</head>
			<body>
				<Outlet />
				<Toaster richColors />
				<TanStackRouterDevtools position="bottom-left" />
				{/* <ReactQueryDevtools position="bottom" buttonPosition="bottom-right" /> */}
				{/* <TanStackDevtools plugins={[formDevtoolsPlugin()]} /> */}
				<Scripts />
			</body>
		</html>
	);
}
