import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { fetchTheme } from "@/features/themes/fns";
import { SpaceThemeSelector } from "@/features/themes/space-selector";

export const Route = createFileRoute("/_auth/$spaceId")({
	loader: async () => {
		const theme = await fetchTheme();
		return { spaceThemeData: theme };
	},
	component: RouteComponent,
});

// ---------------------------------------------------------
// Extracted Navigation Content (Used in both Desktop & Mobile Drawer)
// ---------------------------------------------------------
function SidebarNav() {
	return (
		<>
			{/* HEADER */}
			<div className="flex h-8 shrink-0 items-center border-border border-b bg-muted/50 px-3 font-bold text-foreground text-xs">
				🪐 Notai HQ
			</div>

			{/* SCROLLABLE NAVIGATION */}
			<nav className="flex flex-1 flex-col gap-3 overflow-y-auto p-2">
				<details open className="group">
					<summary className="cursor-pointer select-none bg-secondary px-1 py-0.5 font-bold text-secondary-foreground text-xs uppercase">
						General
					</summary>
					<ul className="mt-1 flex flex-col gap-0.5 pl-1">
						<li className="cursor-pointer px-1 py-0.5 text-xs hover:bg-accent hover:text-accent-foreground">
							💬 main-chat
						</li>
						<li className="cursor-pointer px-1 py-0.5 text-xs hover:bg-accent hover:text-accent-foreground">
							💬 off-topic
						</li>
						<li className="cursor-pointer px-1 py-0.5 text-xs hover:bg-accent hover:text-accent-foreground">
							📖 rules-and-faq
						</li>
					</ul>
				</details>

				<details open className="group">
					<summary className="cursor-pointer select-none bg-secondary px-1 py-0.5 font-bold text-secondary-foreground text-xs uppercase">
						Development
					</summary>
					<ul className="mt-1 flex flex-col gap-0.5 pl-1">
						<li className="cursor-pointer bg-accent px-1 py-0.5 font-bold text-accent-foreground text-xs">
							💬 architecture
						</li>
						<li className="cursor-pointer px-1 py-0.5 text-xs hover:bg-accent hover:text-accent-foreground">
							📖 stack-docs
						</li>
					</ul>
				</details>
			</nav>
		</>
	)
}

// ---------------------------------------------------------
// Main Route Component
// ---------------------------------------------------------
function RouteComponent() {
	const { spaceThemeData } = Route.useLoaderData();
	// const themeStyles = getThemeStyles(theme.variables as ThemeVariables);

	return (
		<TooltipProvider delay={300}>
			<div
				// className={`flex h-screen w-full flex-col bg-background font-mono text-foreground ${theme.isDark ? "dark" : ""}`}
				className={
					"flex h-screen w-full flex-col bg-background font-mono text-foreground"
				}
				// style={themeStyles}
			>
				{/* VERY TOP BAR */}
				<div className="flex items-center justify-between border-border border-b bg-accent px-2 text-accent-foreground text-xs">
					<div className="flex items-center gap-2">
						<span className="text-base">🧈</span>
					</div>
					<div className="flex items-center gap-4">
						<SpaceThemeSelector spaceId="id">
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
						<SidebarNav />
					</aside>

					{/* MAIN CONTENT AREA */}
					<main className="flex min-w-0 flex-1 flex-col bg-background">
						{/* ITEM DETAILS BAR (CHANNEL HEADER) */}
						<div className="flex h-8 shrink-0 items-center justify-between border-border border-b bg-muted/50 px-3 text-foreground text-xs">
							{/* Left Side: Mobile Drawer Trigger + Channel Name */}
							<div className="flex items-center gap-2">
								{/* MOBILE DRAWER TRIGGER */}
								<div className="md:hidden">
									<Drawer>
										<DrawerTrigger asChild>
											<button
												type="button"
												className="flex cursor-pointer items-center justify-center rounded-none p-1 hover:bg-accent hover:text-accent-foreground"
											>
												<Menu />
											</button>
										</DrawerTrigger>
										<Separator orientation="vertical" />
										<DrawerContent className="h-[75vh] font-mono">
											{/* Visually hidden header for screen-reader accessibility */}
											<DrawerHeader className="sr-only">
												<DrawerTitle>Navigation Menu</DrawerTitle>
											</DrawerHeader>
											{/* Reused SidebarNav inside Drawer */}
											<div className="flex h-full flex-col overflow-hidden text-foreground">
												<SidebarNav />
											</div>
										</DrawerContent>
									</Drawer>
								</div>
								<div className="truncate font-bold">💬 architecture</div>
							</div>

							{/* Channel Tools & Pagination */}
							<div className="flex shrink-0 items-center gap-4 overflow-x-auto">
								{/* Pagination Controls */}
								<div className="flex items-center gap-1 font-mono">
									<button
										type="button"
										className="cursor-pointer px-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
										disabled
									>
										&lt;&lt
									</button>
									<button
										type="button"
										className="cursor-pointer px-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
										disabled
									>
										&lt
									</button>
									<span className="whitespace-nowrap px-2">Pg 1 / 42</span>
									<button
										type="button"
										className="cursor-pointer px-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
									>
										&gt
									</button>
									<button
										type="button"
										className="cursor-pointer px-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
									>
										&gt;&gt
									</button>
								</div>
								<div className="h-4 w-[1px] shrink-0 bg-border" />{" "}
								{/* Divider */}
								{/* Actions with Shadcn Tooltips */}
								<div className="flex items-center gap-2">
									<Tooltip>
										<TooltipTrigger
											render={
												<button
													type="button"
													className="cursor-pointer rounded-sm px-1 hover:bg-accent hover:text-accent-foreground"
												/>
											}
										>
											📌
										</TooltipTrigger>
										<TooltipContent className="font-mono text-xs">
											<p>Pinned Messages</p>
										</TooltipContent>
									</Tooltip>
									<Tooltip>
										<TooltipTrigger
											render={
												<button
													type="button"
													className="cursor-pointer rounded-sm px-1 hover:bg-accent hover:text-accent-foreground"
												/>
											}
										>
											🔖
										</TooltipTrigger>
										<TooltipContent className="font-mono text-xs">
											<p>Bookmark Channel</p>
										</TooltipContent>
									</Tooltip>

									<Tooltip>
										<TooltipTrigger
											render={
												<button
													type="button"
													className="cursor-pointer rounded-sm px-1 hover:bg-accent hover:text-accent-foreground"
												/>
											}
										>
											🔍
										</TooltipTrigger>
										<TooltipContent className="font-mono text-xs">
											<p>Search Channel</p>
										</TooltipContent>
									</Tooltip>
								</div>
							</div>
						</div>

						<div className="flex-1 overflow-y-auto p-4">
							<MockChatList />
							{/* <Outlet /> */}
						</div>

						{/* CHAT INPUT AREA */}
						<div className="border-border border-t bg-muted/30 p-2">
							<div className="flex gap-2">
								<input
									type="text"
									placeholder="Message architecture..."
									className="min-w-0 flex-1 border border-input bg-background px-2 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
								/>
								<button
									type="submit"
									className="shrink-0 border border-border bg-secondary px-4 py-1 font-bold text-secondary-foreground text-sm hover:bg-secondary/80 active:translate-y-[1px]"
								>
									Send
								</button>
							</div>
						</div>
					</main>
				</div>
			</div>
		</TooltipProvider>
	)
}

// ---------------------------------------------------------
// Mock component - Cleaned up to look like a chat stream
// ---------------------------------------------------------
function MockChatList() {
	return (
		<div className="flex flex-col gap-2">
			<div className="py-1 hover:bg-muted/20">
				<div className="mb-0.5 text-muted-foreground text-xs">
					<span className="mr-2 font-bold text-primary">Anonymous</span>
					<span>02/22/26(Sun)19:54:12 No.1029384</span>
				</div>
				<div className="text-sm">
					anyone else trying to get oRPC working with Bun? kept hitting a weird
					edge case with the router.
				</div>
			</div>

			<div className="py-1 hover:bg-muted/20">
				<div className="mb-0.5 text-muted-foreground text-xs">
					<span className="mr-2 font-bold text-destructive">Admin</span>
					<span>02/22/26(Sun)19:59:53 No.1029385</span>
				</div>
				<div className="text-sm">
					<span className="text-muted-foreground italic">
						&gt; kept hitting a weird edge case with the router.
					</span>
					<br />
					Yeah, I ran into that while deploying Notai last week. Make sure you
					check the Cloudflare worker bindings if you're routing it through
					there.
				</div>
			</div>
		</div>
	)
}
