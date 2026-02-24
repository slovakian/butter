import type React from "react";
import { useState } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ThemeSelector } from "./selector";

interface SpaceThemeSelectorProps {
	spaceId: string;
	children: (props: { openDialog: () => void }) => React.ReactNode;
}

export function SpaceThemeSelector({
	spaceId,
	children,
}: SpaceThemeSelectorProps) {
	const [isOpen, setIsOpen] = useState(false);

	// Mock mutation function
	const mutateSpaceTheme = async (selectedThemeId: string) => {
		console.log(
			`[Mock Mutation] Applying theme '${selectedThemeId}' to space '${spaceId}'...`,
		);
		// Example implementation: await trpc/oRPC mutation here

		// Close the dialog on success
		setIsOpen(false);
	};

	const openDialog = () => setIsOpen(true);

	return (
		<>
			{/* The render prop function: 
        Passes the openDialog trigger down to whatever button/element you want 
      */}
			{children({ openDialog })}

			{/* Sibling Dialog */}
			<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
				<AlertDialogContent className="max-w-2xl border-border bg-background">
					<AlertDialogHeader>
						<AlertDialogTitle className="text-foreground">
							Select Space Theme
						</AlertDialogTitle>
						<AlertDialogDescription className="text-muted-foreground">
							Choose a theme to apply to this space. You can select from your
							favorites or browse popular themes on Butter.
						</AlertDialogDescription>
					</AlertDialogHeader>

					{/* The ThemeSelector we built previously */}
					<div className="max-h-[60vh] overflow-y-auto">
						<ThemeSelector />
					</div>

					<AlertDialogFooter>
						<AlertDialogCancel className="border-border text-foreground hover:bg-muted">
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => mutateSpaceTheme("mock-selected-theme-id")}
							className="bg-primary text-primary-foreground hover:bg-primary/90"
						>
							Apply Theme
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
