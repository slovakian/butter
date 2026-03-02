import { useMutation } from "@tanstack/react-query";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
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
import { api } from "@/utils/orpc";
import { ThemeSelector } from "./selector";

interface BoardThemeSelectorProps {
	boardId: string;
	children: (props: { openDialog: () => void }) => React.ReactNode;
}

export function BoardThemeSelector({
	boardId,
	children,
}: BoardThemeSelectorProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);

	const { mutate, isPending } = useMutation(
		api.theme.applyToBoard.mutationOptions({
			onSuccess: () => {
				toast.success("Theme applied successfully");
				setIsOpen(false);
			},
			onError: (error) => {
				toast.error(error.message);
			},
		}),
	);

	const handleApply = () => {
		if (!selectedThemeId) return;
		const themeIdNum = Number.parseInt(selectedThemeId);
		const boardIdNum = Number.parseInt(boardId);

		if (Number.isNaN(themeIdNum) || Number.isNaN(boardIdNum)) {
			toast.error("Invalid board or theme ID");
			return;
		}

		mutate({
			boardId: boardIdNum,
			themeId: themeIdNum,
		});
	};

	return (
		<>
			{/* The render prop function: 
        Passes the openDialog trigger down to whatever button/element you want 
      */}
			{children({ openDialog: () => setIsOpen(true) })}

			{/* Sibling Dialog */}
			<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
				<AlertDialogContent className="max-w-2xl border-border bg-background">
					<AlertDialogHeader>
						<AlertDialogTitle className="text-foreground">
							Select Board Theme
						</AlertDialogTitle>
						<AlertDialogDescription className="text-muted-foreground">
							Choose a theme to apply to this board. You can select from your
							favorites or browse popular themes on Butter.
						</AlertDialogDescription>
					</AlertDialogHeader>

					{/* The ThemeSelector we built previously */}
					<div className="max-h-[60vh] overflow-y-auto">
						<ThemeSelector
							selectedThemeId={selectedThemeId}
							onSelect={setSelectedThemeId}
						/>
					</div>

					<AlertDialogFooter>
						<AlertDialogCancel className="border-border text-foreground hover:bg-muted">
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleApply}
							disabled={!selectedThemeId || isPending}
							className="bg-primary text-primary-foreground hover:bg-primary/90"
						>
							{isPending ? "Applying..." : "Apply Theme"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
