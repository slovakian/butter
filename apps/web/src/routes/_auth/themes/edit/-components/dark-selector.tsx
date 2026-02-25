import { useThemeEditor } from "@/features/themes/editor/provider";

export function DarkSelector() {
	const { isDark, setIsDark } = useThemeEditor((state) => state);

	return (
		<div className="flex items-center gap-2">
			<input
				type="checkbox"
				id="dark-mode-toggle"
				checked={isDark}
				onChange={(e) => setIsDark(e.target.checked)}
				className="h-4 w-4"
			/>
			<label
				htmlFor="dark-mode-toggle"
				className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
			>
				Theme is Dark
			</label>
		</div>
	);
}
