import { useMutation } from "@tanstack/react-query";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { File, Pencil, Save } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { DEFAULT_THEME } from "@/features/themes/constants";
import {
	ThemeEditorProvider,
	useThemeEditor,
} from "@/features/themes/editor/provider";
import { tokyoNightTheme, yotsubaTheme } from "@/features/themes/editor/themes";
import { buildThemeStyles } from "@/features/themes/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn, deepEqual } from "@/lib/utils";
import { api } from "@/utils/orpc";
import { CssEditor } from "./-components/css-editor";
// import { DarkSelector } from "./-components/dark-selector";
import {
	EditorTabs,
	EditorTabsList,
	EditorTabsTrigger,
} from "./-components/editor-tabs";
import { JsonEditor } from "./-components/json-editor";
import { MenuBar } from "./-components/menu-bar";
import { ThemeNameEditor } from "./-components/name-editor";
import { Showcase } from "./-components/showcase";
import { ThemeName } from "./-components/theme-name";

export const Route = createFileRoute("/_auth/themes/edit/")({
	validateSearch: z.object({
		id: z.int().optional(),
	}),
	loaderDeps: ({ search: { id } }) => ({ id }),
	loader: async ({ deps: { id } }) => {
		let theme = null;

		if (id !== undefined) {
			try {
				theme = await api.theme.get.byId.call({
					id,
				});
			} catch (error) {
				console.error("Failed to fetch theme:", error);
				// If theme not found, redirect to create mode
				throw redirect({
					to: "/themes/edit",
				});
			}
		}

		return { theme };
	},
	staleTime: Number.POSITIVE_INFINITY,
	component: RouteComponent,
});

function RouteComponent() {
	const { theme } = Route.useLoaderData();
	const initialData = theme ?? DEFAULT_THEME;

	return (
		<ThemeEditorProvider initialData={initialData}>
			<ThemeEditorContent initialData={initialData} />
		</ThemeEditorProvider>
	);
}

function ThemeEditorContent({ initialData }: { initialData: any }) {
	const isMobile = useIsMobile();
	const { variables, name, isDark } = useThemeEditor((state) => state);
	const navigate = useNavigate();

	const [activeTab, setActiveTab] = useState<"json" | "css">("json");

	const currentTheme = useTheme();

	const isUpdate = !!initialData.id;

	// Determine if the theme is dirty (has changes)
	// For new themes (no ID), we allow saving even if unchanged (as per user request)
	// For existing themes, we check against initial data
	const isDirty =
		!isUpdate ||
		!deepEqual(
			{
				name,
				isDark,
				variables,
			},
			{
				name: initialData.name,
				isDark: initialData.isDark,
				variables: initialData.variables,
			},
		);

	const createMutation = useMutation(
		api.theme.create.mutationOptions({
			onSuccess: (data) => {
				toast.success("Theme created successfully");
				navigate({
					to: "/themes/edit",
					search: { id: data.id },
					replace: true,
				});
			},
			onError: (error) => {
				toast.error(error.message);
			},
		}),
	);

	const updateMutation = useMutation(
		api.theme.update.mutationOptions({
			onSuccess: () => {
				toast.success("Theme updated successfully");
			},
			onError: (error) => {
				toast.error(error.message);
			},
		}),
	);

	const handleSave = () => {
		if (isUpdate) {
			updateMutation.mutate({
				id: initialData.id,
				name,
				isDark,
				variables,
			});
		} else {
			createMutation.mutate({
				name,
				isDark,
				variables,
			});
		}
	};

	const isPending = createMutation.isPending || updateMutation.isPending;

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
								<ThemeName asFilename={true} maxLength={10} />
								<span className="opacity-50">/</span> json
							</EditorTabsTrigger>
							<EditorTabsTrigger value="css">
								<ThemeName asFilename={true} maxLength={10} />
								<span className="opacity-50">/</span> css
							</EditorTabsTrigger>
						</EditorTabsList>
					</EditorTabs>
				</div>

				{/* Right Side: Vertically centered as usual, with its independent bottom border */}
				<div className="flex h-full flex-1 items-center justify-end gap-4 border-b px-4 text-xs">
					<ThemeNameEditor>
						{({ openDialog }) => (
							<div className="flex items-center gap-2">
								<span className="font-medium text-muted-foreground">
									<ThemeName />
								</span>
								<Button
									variant="ghost"
									size="icon-sm"
									onClick={openDialog}
									className="h-6 w-6"
								>
									<Pencil className="h-3 w-3" />
								</Button>
							</div>
						)}
					</ThemeNameEditor>

					<div className="h-4 w-px bg-border" />

					<Button
						variant="ghost"
						size="sm"
						onClick={handleSave}
						disabled={!isDirty || isPending}
						className="h-6 gap-1.5 px-2 font-normal text-xs"
					>
						<Save className="h-3 w-3" />
						{isUpdate ? "Update" : "Publish"}
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
