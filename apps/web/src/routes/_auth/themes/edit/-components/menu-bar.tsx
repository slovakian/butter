import { useState } from "react";
import {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from "@/components/ui/menubar";

export function MenuBar() {
	const [wordWrap, setWordWrap] = useState(true);
	const [minimap, setMinimap] = useState(false);

	return (
		<Menubar className="rounded-none border-0 bg-transparent px-0 shadow-none">
			<MenubarMenu>
				<MenubarTrigger className="px-2 py-0.5 font-normal text-xs">
					File
				</MenubarTrigger>
				<MenubarContent>
					<MenubarItem>
						New File <MenubarShortcut>Ctrl+N</MenubarShortcut>
					</MenubarItem>
					<MenubarItem>
						Open File... <MenubarShortcut>Ctrl+O</MenubarShortcut>
					</MenubarItem>
					<MenubarItem>
						Open Folder... <MenubarShortcut>Ctrl+K</MenubarShortcut>
					</MenubarItem>
					<MenubarSeparator />
					<MenubarItem>
						Save <MenubarShortcut>Ctrl+S</MenubarShortcut>
					</MenubarItem>
					<MenubarItem>
						Save As... <MenubarShortcut>Ctrl+Shift+S</MenubarShortcut>
					</MenubarItem>
					<MenubarItem>Save All</MenubarItem>
					<MenubarSeparator />
					<MenubarItem>
						Close Editor <MenubarShortcut>Ctrl+W</MenubarShortcut>
					</MenubarItem>
					<MenubarItem>Close Window</MenubarItem>
				</MenubarContent>
			</MenubarMenu>

			<MenubarMenu>
				<MenubarTrigger className="px-2 py-0.5 font-normal text-xs">
					Edit
				</MenubarTrigger>
				<MenubarContent>
					<MenubarItem>
						Undo <MenubarShortcut>Ctrl+Z</MenubarShortcut>
					</MenubarItem>
					<MenubarItem>
						Redo <MenubarShortcut>Ctrl+Y</MenubarShortcut>
					</MenubarItem>
					<MenubarSeparator />
					<MenubarItem>
						Cut <MenubarShortcut>Ctrl+X</MenubarShortcut>
					</MenubarItem>
					<MenubarItem>
						Copy <MenubarShortcut>Ctrl+C</MenubarShortcut>
					</MenubarItem>
					<MenubarItem>
						Paste <MenubarShortcut>Ctrl+V</MenubarShortcut>
					</MenubarItem>
					<MenubarSeparator />
					<MenubarItem>
						Find <MenubarShortcut>Ctrl+F</MenubarShortcut>
					</MenubarItem>
					<MenubarItem>
						Replace <MenubarShortcut>Ctrl+H</MenubarShortcut>
					</MenubarItem>
				</MenubarContent>
			</MenubarMenu>

			<MenubarMenu>
				<MenubarTrigger className="px-2 py-0.5 font-normal text-xs">
					Apply
				</MenubarTrigger>
				<MenubarContent>
					<MenubarSub>
						<MenubarSubTrigger>Appearance</MenubarSubTrigger>
						<MenubarSubContent>
							<MenubarItem>Fullscreen</MenubarItem>
							<MenubarItem>Zen Mode</MenubarItem>
							<MenubarSeparator />
							<MenubarCheckboxItem
								checked={minimap}
								onCheckedChange={(v) => setMinimap(v === true)}
							>
								Minimap
							</MenubarCheckboxItem>
							<MenubarCheckboxItem
								checked={wordWrap}
								onCheckedChange={(v) => setWordWrap(v === true)}
							>
								Word Wrap
							</MenubarCheckboxItem>
						</MenubarSubContent>
					</MenubarSub>
					<MenubarSeparator />
					<MenubarItem>Apply to user...</MenubarItem>
					<MenubarItem>Apply to board...</MenubarItem>
				</MenubarContent>
			</MenubarMenu>

			<MenubarMenu>
				<MenubarTrigger className="px-2 py-0.5 font-normal text-xs">
					Help
				</MenubarTrigger>
				<MenubarContent>
					<MenubarItem>Welcome</MenubarItem>
					<MenubarItem>Documentation</MenubarItem>
					<MenubarItem>Release Notes</MenubarItem>
					<MenubarSeparator />
					<MenubarItem>Report Issue</MenubarItem>
					<MenubarSeparator />
					<MenubarItem>About</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	);
}
