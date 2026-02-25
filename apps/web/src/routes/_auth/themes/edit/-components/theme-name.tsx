import { useDebouncedValue } from "@tanstack/react-pacer";
import { useThemeEditor } from "@/features/themes/editor/provider";

interface ThemeFilenameProps {
	maxLength?: number;
	extension?: string; // e.g., ".json"
}

export function ThemeFilename({
	maxLength,
	extension = "",
}: ThemeFilenameProps) {
	const liveName = useThemeEditor((state) => state.name) || "";
	const [debouncedName] = useDebouncedValue(liveName, { wait: 300 });

	// 1. Clean and format the base string
	let safeName = debouncedName
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "") // Strip everything except alphanumerics, spaces, hyphens, and underscores
		.replace(/[\s_]+/g, "_") // Convert all spaces and consecutive underscores into a single underscore
		.replace(/^[-_]+|[-_]+$/g, ""); // Strip leading or trailing underscores/hyphens

	// Fallback if the cleaning process leaves us with an empty string
	if (!safeName) {
		safeName = "untitled_theme";
	}

	// 2. Return early if no truncation is needed
	if (!maxLength || safeName.length <= maxLength) {
		return <>{`${safeName}${extension}`}</>;
	}

	// 3. Truncate logic
	// The user's maxLength applies to the characters kept, excluding the 3 dots.
	const startLength = Math.ceil(maxLength / 2);
	const endLength = Math.floor(maxLength / 2);

	let startChunk = safeName.slice(0, startLength);
	let endChunk = safeName.slice(-endLength);

	// 4. Strip underscores that touch the ellipsis
	startChunk = startChunk.replace(/_+$/, "");
	endChunk = endChunk.replace(/^_+/, "");

	return <>{`${startChunk}...${endChunk}${extension}`}</>;
}
