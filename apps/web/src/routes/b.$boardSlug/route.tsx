import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SpaceThemeSelector } from "@/features/themes/space-selector";
import { api } from "@/utils/orpc";
import { SidebarNav } from "./-components/sidebar-nav";

export const Route = createFileRoute("/b/$boardSlug")({
	loader: async ({ context, params }) => {
		await context.queryClient.ensureQueryData(
			api.board.getBySlug.queryOptions({ input: { slug: params.boardSlug } }),
		);
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
				{/* VERY TOP BAR */}
				<div className="flex items-center justify-between border-border border-b bg-accent px-2 text-accent-foreground text-xs">
					<div className="flex items-center gap-2">
						<span className="text-base">🧈</span>
						<Link
							to="/b/$boardSlug"
							params={{ boardSlug }}
							className="font-bold hover:underline"
						>
							{board.name}
						</Link>
					</div>
					<div className="flex items-center gap-4">
						<SpaceThemeSelector spaceId={String(board.id)}>
							{({ openDialog }) => (
								<button
									type="button"
									onClick={openDialog}
									className="flex cursor-pointer items-center gap-1 hover:underline focus:outline-none"
								>
									🌓 Theme
								</button>
							)}
						</SpaceThemeSelector>
						<ul className="flex items-center gap-3">
							<li className="flex cursor-pointer items-center gap-1 font-bold text-destructive hover:underline">
								🛡️ Admin
							</li>
							<li className="flex cursor-pointer items-center gap-1 hover:underline">
								⚙️ Settings
							</li>
						</ul>
					</div>
				</div>

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
