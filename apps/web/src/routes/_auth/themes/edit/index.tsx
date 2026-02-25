import { createFileRoute } from "@tanstack/react-router";
import { File } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
	ThemeEditorProvider,
	useThemeEditor,
} from "@/features/themes/editor/provider";
import { tokyoNightTheme, yotsubaTheme } from "@/features/themes/editor/themes";
import { fetchTheme } from "@/features/themes/fns";
import { buildThemeStyles } from "@/features/themes/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { CssEditor } from "./-components/css-editor";
import { DarkSelector } from "./-components/dark-selector";
import {
	EditorTabs,
	EditorTabsList,
	EditorTabsTrigger,
} from "./-components/editor-tabs";
import { JsonEditor } from "./-components/json-editor";
import { MenuBar } from "./-components/menu-bar";
import { Showcase } from "./-components/showcase";
import { ThemeFilename } from "./-components/theme-name";

export const Route = createFileRoute("/_auth/themes/edit/")({
	validateSearch: z.object({
		id: z.string().optional(),
	}),
	loader: async () => {
		const theme = await fetchTheme();
		return { theme };
	},
	staleTime: Number.POSITIVE_INFINITY,
	component: RouteComponent,
});

function RouteComponent() {
	const { theme } = Route.useLoaderData();

	return (
		<ThemeEditorProvider initialData={theme}>
			<ThemeEditorContent />
		</ThemeEditorProvider>
	);
}

function ThemeEditorContent() {
	const isMobile = useIsMobile();
	const { variables } = useThemeEditor((state) => state);

	// 2. Consume the jotai atom instead of local state
	const [activeTab, setActiveTab] = useState<"json" | "css">("json");

	const { isDark } = useThemeEditor((state) => state);

	const currentTheme = useTheme();

	return (
		<div className="flex h-screen w-full flex-col overflow-hidden bg-background text-foreground">
			<div className="flex h-7 w-full items-center justify-between border-b bg-muted/50 px-1">
				<MenuBar />
				<div className="px-2">
					<span className="text-sm">🧈</span>
				</div>
			</div>
			{/* Top Bar */}
			<div className="flex h-8 shrink-0">
				{/* Left Side: Using items-end to snap the tabs perfectly to the bottom baseline */}
				<div className="flex h-full items-end">
					<EditorTabs
						orientation="horizontal"
						value={activeTab}
						onValueChange={(val) => setActiveTab(val as "json" | "css")}
					>
						{/* Padding preserved exactly as requested */}
						<EditorTabsList className="pt-1 pl-8">
							<EditorTabsTrigger value="json">
								<ThemeFilename maxLength={10} />
								.json
							</EditorTabsTrigger>
							<EditorTabsTrigger value="css">
								<ThemeFilename maxLength={10} />
								.css
							</EditorTabsTrigger>
						</EditorTabsList>
					</EditorTabs>
				</div>

				{/* Right Side: Vertically centered as usual, with its independent bottom border */}
				<div className="flex h-full flex-1 items-center justify-end gap-4 border-b px-4 text-xs">
					Random
				</div>
			</div>

			{/* Main Content */}
			<ResizablePanelGroup
				orientation={isMobile ? "vertical" : "horizontal"}
				className="flex-1"
			>
				{/* Editor Panel */}
				<ResizablePanel defaultSize={40} minSize={20}>
					{/* 3. Absolute stacking context to prevent remounting */}
					<div className="relative h-full w-full">
						{/* JSON Editor */}
						<div
							className={cn(
								"absolute inset-0 h-full w-full transition-opacity",
								activeTab === "json"
									? "visible z-10 opacity-100"
									: "invisible z-0 opacity-0",
							)}
						>
							<JsonEditor
								isActive={activeTab === "json"}
								theme={
									currentTheme.theme === "dark" ? tokyoNightTheme : yotsubaTheme
								}
							/>
						</div>

						{/* CSS Editor */}
						<div
							className={cn(
								"absolute inset-0 h-full w-full transition-opacity",
								activeTab === "css"
									? "visible z-10 opacity-100"
									: "invisible z-0 opacity-0",
							)}
						>
							<CssEditor
								isActive={activeTab === "css"}
								theme={
									currentTheme.theme === "dark" ? tokyoNightTheme : yotsubaTheme
								}
							/>
						</div>
					</div>
				</ResizablePanel>

				<ResizableHandle />

				{/* Showcase Panel */}
				<ResizablePanel defaultSize={60} minSize={30}>
					<div
						className={cn(
							"h-full w-full overflow-auto p-6 transition-colors",
							isDark ? "dark bg-slate-950" : "bg-slate-50",
						)}
					>
						<div
							className={cn(
								"rounded-lg border bg-background text-foreground shadow-sm transition-all",
								isDark && "dark",
							)}
							style={buildThemeStyles(variables) as React.CSSProperties}
						>
							<Showcase className="p-6" />
						</div>
					</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}
