import { useDebouncedValue } from "@tanstack/react-pacer";
import { useThemeEditor } from "@/features/themes/editor/provider";

interface ThemeFilenameProps {
	maxLength?: number;
	extension?: string; // e.g., ".json"
	asFilename?: boolean; // Defaults to true
}

export function ThemeName({
	maxLength,
	extension = "",
	asFilename = false,
}: ThemeFilenameProps) {
	const liveName = useThemeEditor((state) => state.name) || "";
	const [debouncedName] = useDebouncedValue(liveName, { wait: 300 });

	let displayName = debouncedName;

	if (asFilename) {
		// 1. Clean and format the base string
		displayName = displayName
			.toLowerCase()
			.trim()
			.replace(/[^\w\s-]/g, "") // Strip everything except alphanumerics, spaces, hyphens, and underscores
			.replace(/[\s_-]+/g, "_") // Convert consecutive spaces, underscores AND hyphens into a single underscore
			.replace(/^_|_$/g, ""); // Strip leading or trailing underscores

		// Fallback if the cleaning process leaves us with an empty string
		if (!displayName) {
			displayName = "untitled_theme";
		}
	} else {
		if (!displayName) {
			displayName = "Untitled Theme";
		}
	}

	// 2. Return early if no truncation is needed
	if (!maxLength || displayName.length <= maxLength) {
		return <>{`${displayName}${extension}`}</>;
	}

	// 3. Truncate logic
	// The user's maxLength applies to the characters kept, excluding the 3 dots.
	const startLength = Math.ceil(maxLength / 2);
	const endLength = Math.floor(maxLength / 2);

	let startChunk = displayName.slice(0, startLength);
	let endChunk = displayName.slice(-endLength);

	// 4. Strip underscores that touch the ellipsis
	if (asFilename) {
		startChunk = startChunk.replace(/_+$/, "");
		endChunk = endChunk.replace(/^_+/, "");
	} else {
		startChunk = startChunk.trimEnd();
		endChunk = endChunk.trimStart();
	}

	return <>{`${startChunk}...${endChunk}${extension}`}</>;
}
