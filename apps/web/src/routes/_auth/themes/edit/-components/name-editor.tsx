import { themeNameSchema } from "@butter/shared/themes/validation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useThemeEditor } from "@/features/themes/editor/provider";

interface ThemeNameEditorProps {
	children: (props: { openDialog: () => void }) => React.ReactNode;
}

export function ThemeNameEditor({ children }: ThemeNameEditorProps) {
	const [open, setOpen] = useState(false);
	const name = useThemeEditor((state) => state.name);
	const setName = useThemeEditor((state) => state.setName);
	const [localName, setLocalName] = useState(name);
	const [error, setError] = useState<string | null>(null);

	const handleOpenChange = (newOpen: boolean) => {
		if (newOpen) {
			setLocalName(name);
			setError(null);
		}
		setOpen(newOpen);
	};

	const handleSave = () => {
		const result = themeNameSchema.safeParse(localName);
		if (result.success) {
			setName(result.data);
			setOpen(false);
		} else {
			setError(result.error.issues[0].message);
		}
	};

	return (
		<>
			{children({ openDialog: () => setOpen(true) })}
			<Dialog open={open} onOpenChange={handleOpenChange}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit Theme Name</DialogTitle>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								Name
							</Label>
							<div className="col-span-3">
								<Input
									id="name"
									value={localName}
									onChange={(e) => {
										setLocalName(e.target.value);
										setError(null);
									}}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											handleSave();
										}
									}}
									maxLength={50}
								/>
								{error && (
									<p className="mt-1 text-destructive text-xs">{error}</p>
								)}
							</div>
						</div>
					</div>
					<DialogFooter>
						<Button onClick={handleSave}>Save changes</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
