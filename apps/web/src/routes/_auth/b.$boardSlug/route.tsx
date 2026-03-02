import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { TopBar } from "@/components/topbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { fetchTheme } from "@/features/themes/fns";
import { SpaceThemeSelector } from "@/features/themes/space-selector";
import { api } from "@/utils/orpc";
import { SidebarNav } from "./-components/sidebar-nav";

export const Route = createFileRoute("/_auth/b/$boardSlug")({
	loader: async ({ context, params }) => {
		await context.queryClient.ensureQueryData(
			api.board.getBySlug.queryOptions({ input: { slug: params.boardSlug } }),
		);
		const theme = await fetchTheme();
		return { spaceThemeData: theme };
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { boardSlug } = Route.useParams();

	const { data: board } = useSuspenseQuery(
		api.board.getBySlug.queryOptions({
			input: { slug: boardSlug },
			staleTime: Number.POSITIVE_INFINITY,
		}),
	);

	if (!board) return <div>Board not found</div>;

	return (
		<TooltipProvider delay={300}>
			<div className="flex h-screen w-full flex-col bg-background font-mono text-foreground">
				<TopBar />

				<div className="flex flex-1 overflow-hidden">
					{/* DESKTOP SIDEBAR (Hidden on mobile) */}
					<aside className="hidden w-56 shrink-0 flex-col border-border border-r bg-muted/30 md:flex">
						<SidebarNav
							items={
								board.items?.map((item) => ({
									id: String(item.id),
									name: item.name,
									slug: item.slug,
									type: item.type,
								})) || []
							}
						/>
					</aside>

					{/* MAIN CONTENT AREA */}
					<main className="flex min-w-0 flex-1 flex-col bg-background">
						<Outlet />
					</main>
				</div>
			</div>
		</TooltipProvider>
	);
}
