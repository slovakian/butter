import { tags as t } from "@lezer/highlight";
import { createTheme } from "@uiw/codemirror-themes";

export const yotsubaTheme = createTheme({
	theme: "light",
	settings: {
		background: "oklch(99.2% 0.02 103)", // Classic #ffffee pale yellow
		foreground: "oklch(35% 0.14 25)", // Maroon text
		caret: "oklch(35% 0.14 25)",
		selection: "oklch(92% 0.03 55)", // Reply box peach/beige
		selectionMatch: "oklch(88% 0.04 55)",
		lineHighlight: "oklch(92% 0.03 55 / 50%)",
		gutterBackground: "oklch(99.2% 0.02 103)",
		gutterForeground: "oklch(65% 0.05 25)",
	},
	styles: [
		{ tag: t.comment, color: "oklch(60% 0.13 135)" }, // Greentext
		{ tag: t.variableName, color: "oklch(35% 0.14 25)" },
		{ tag: [t.string, t.special(t.brace)], color: "oklch(60% 0.13 135)" },
		{ tag: t.number, color: "oklch(45% 0.2 280)" }, // Link blue
		{ tag: t.bool, color: "oklch(45% 0.2 280)" },
		{ tag: t.null, color: "oklch(45% 0.2 280)" },
		{ tag: t.keyword, color: "oklch(40% 0.12 25)" },
		{ tag: t.operator, color: "oklch(35% 0.14 25)" },
		{ tag: t.className, color: "oklch(50% 0.18 25)" }, // Post title red
		{ tag: t.definition(t.typeName), color: "oklch(50% 0.18 25)" },
		{ tag: t.typeName, color: "oklch(50% 0.18 25)" },
		{ tag: t.angleBracket, color: "oklch(35% 0.14 25)" },
		{ tag: t.tagName, color: "oklch(50% 0.18 25)" },
		{ tag: t.attributeName, color: "oklch(45% 0.2 280)" },
	],
});

export const tokyoNightTheme = createTheme({
	theme: "dark",
	settings: {
		background: "oklch(18% 0.02 265)", // Deep blue-gray background
		foreground: "oklch(82% 0.04 265)", // Soft blue-white text
		caret: "oklch(82% 0.04 265)",
		selection: "oklch(35% 0.08 265)", // Highlighted text background
		selectionMatch: "oklch(40% 0.09 265)",
		lineHighlight: "oklch(22% 0.03 265 / 50%)",
		gutterBackground: "oklch(18% 0.02 265)",
		gutterForeground: "oklch(45% 0.05 265)", // Muted line numbers
	},
	styles: [
		{ tag: t.comment, color: "oklch(45% 0.05 265)", fontStyle: "italic" },
		{ tag: [t.keyword, t.operator, t.modifier], color: "oklch(70% 0.12 300)" }, // Neon purple/magenta
		{
			tag: [t.function(t.variableName), t.function(t.propertyName)],
			color: "oklch(70% 0.12 260)",
		}, // Bright blue
		{ tag: [t.string, t.special(t.brace)], color: "oklch(75% 0.13 130)" }, // Neon green
		{ tag: [t.number, t.bool, t.null], color: "oklch(70% 0.15 45)" }, // Warm orange
		{ tag: t.variableName, color: "oklch(82% 0.04 265)" }, // Default foreground
		{
			tag: [t.className, t.typeName, t.definition(t.typeName)],
			color: "oklch(75% 0.1 230)",
		}, // Cyan
		{ tag: t.propertyName, color: "oklch(75% 0.1 230)" }, // Cyan
		{ tag: t.tagName, color: "oklch(65% 0.18 15)" }, // Vibrant red/pink
		{ tag: t.attributeName, color: "oklch(70% 0.12 300)" }, // Neon purple/magenta
		{ tag: t.regexp, color: "oklch(75% 0.1 230)" }, // Cyan
	],
});
