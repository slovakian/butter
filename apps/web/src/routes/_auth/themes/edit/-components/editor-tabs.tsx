import { Tabs } from "@base-ui/react/tabs";
import { cn } from "@/lib/utils";

function EditorTabs({ className, ...props }: Tabs.Root.Props) {
	return (
		<Tabs.Root
			data-slot="editor-tabs"
			className={cn("flex flex-col", className)}
			{...props}
		/>
	);
}

function EditorTabsList({ className, ...props }: Tabs.List.Props) {
	return (
		<Tabs.List
			data-slot="editor-tabs-list"
			className={cn(
				"inline-flex w-full items-end border-border border-b bg-transparent",
				className,
			)}
			{...props}
		/>
	);
}

function EditorTabsTrigger({ className, ...props }: Tabs.Tab.Props) {
	return (
		<Tabs.Tab
			data-slot="editor-tabs-trigger"
			className={cn(
				// Base styles — compact height, no rounding on bottom
				"relative inline-flex items-center justify-center gap-1.5 whitespace-nowrap",
				"cursor-pointer px-3 py-1 font-medium text-xs",
				"rounded-t-md border border-transparent",
				"transition-colors",

				// Inactive state — muted, shifted down to overlap list border
				"mb-[-1px] text-muted-foreground",
				"hover:text-foreground/80",

				// Active state — bordered, bottom border matches bg to "open" the tab
				"data-[active]:border-border",
				"data-[active]:border-b-background",
				"data-[active]:bg-background",
				"data-[active]:text-foreground",

				// Focus
				"focus-visible:outline-1 focus-visible:outline-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",

				// Disabled
				"data-[disabled]:pointer-events-none data-[disabled]:opacity-50",

				// SVG sizing
				"[&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none [&_svg]:shrink-0",

				className,
			)}
			{...props}
		/>
	);
}

function EditorTabsContent({ className, ...props }: Tabs.Panel.Props) {
	return (
		<Tabs.Panel
			data-slot="editor-tabs-content"
			className={cn("flex-1 outline-none", className)}
			{...props}
		/>
	);
}

export { EditorTabs, EditorTabsList, EditorTabsTrigger, EditorTabsContent };
