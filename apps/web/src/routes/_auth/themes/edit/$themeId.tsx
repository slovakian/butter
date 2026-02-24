import { createFileRoute } from "@tanstack/react-router";
import { File } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tokyoNightTheme, yotsubaTheme } from "@/features/themes/editor/themes";
import { fetchTheme } from "@/features/themes/fns";
import { useThemeEditorStore } from "@/features/themes/store/useThemeEditorStore";
import { buildThemeStyles } from "@/features/themes/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { CssEditor } from "./-components/css-editor";
import { JsonEditor } from "./-components/json-editor";
import { Showcase } from "./-components/showcase";

export const Route = createFileRoute("/_auth/themes/edit/$themeId")({
	loader: async () => {
		const theme = await fetchTheme();
		return { theme };
	},
	staleTime: Number.POSITIVE_INFINITY,
	component: RouteComponent,
});

function RouteComponent() {
	const { theme } = Route.useLoaderData();
	const isMobile = useIsMobile();
	const { name, isDark, variables, setName, setIsDark, setVariables } =
		useThemeEditorStore();

	// Initialize store with loader data
	useEffect(() => {
		setName(theme.name);
		setIsDark(theme.isDark);
		setVariables(theme.variables);
	}, [theme, setName, setIsDark, setVariables]);

	const [activeTab, setActiveTab] = useState("json");
	const [mode, setMode] = useState<"light" | "dark">(
		theme.isDark ? "dark" : "light",
	);

	const currentTheme = useTheme();

	return (
		<div className="flex h-screen w-full flex-col overflow-hidden bg-background text-foreground">
			{/* Top Bar */}
			<div className="flex h-14 shrink-0 items-center justify-between border-b px-4">
				<div className="flex items-center gap-4">
					<div className="font-medium">Theme Editor</div>
					<Tabs
						value={activeTab}
						onValueChange={setActiveTab}
						className="w-[200px]"
					>
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="json">JSON</TabsTrigger>
							<TabsTrigger value="css">CSS</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>

				<div className="flex items-center gap-4">
					<Tabs
						value={mode}
						onValueChange={(v) => setMode(v as "light" | "dark")}
					>
						<TabsList>
							<TabsTrigger value="light">Light</TabsTrigger>
							<TabsTrigger value="dark">Dark</TabsTrigger>
						</TabsList>
					</Tabs>
					<Button>
						<File className="mr-2 h-4 w-4" />
						Save
					</Button>
				</div>
			</div>

			{/* Main Content */}
			<ResizablePanelGroup
				orientation={isMobile ? "vertical" : "horizontal"}
				className="flex-1"
			>
				{/* Editor Panel */}
				<ResizablePanel defaultSize={40} minSize={20}>
					<Tabs value={activeTab} className="h-full w-full">
						<TabsContent value="json" className="m-0 h-full border-none p-0">
							<JsonEditor
								isActive={activeTab === "json"}
								theme={
									currentTheme.theme === "dark" ? tokyoNightTheme : yotsubaTheme
								}
							/>
						</TabsContent>
						<TabsContent value="css" className="m-0 h-full border-none p-0">
							<CssEditor
								isActive={activeTab === "css"}
								theme={
									currentTheme.theme === "dark" ? tokyoNightTheme : yotsubaTheme
								}
							/>
						</TabsContent>
					</Tabs>
				</ResizablePanel>

				<ResizableHandle />

				{/* Showcase Panel */}
				<ResizablePanel defaultSize={60} minSize={30}>
					<div
						className={cn(
							"h-full w-full overflow-auto p-6 transition-colors",
							mode === "dark" ? "dark bg-slate-950" : "bg-slate-50",
						)}
					>
						<div
							className={cn(
								"rounded-lg border bg-background text-foreground shadow-sm transition-all",
								mode === "dark" && "dark",
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
