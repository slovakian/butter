import type { ThemeVariables } from "@butter/shared/themes/types";

// Map of ThemeVariables keys to CSS variable names (without -- prefix)
export const THEME_VAR_MAP: Record<keyof ThemeVariables, string> = {
	background: "background",
	foreground: "foreground",
	card: "card",
	cardForeground: "card-foreground",
	popover: "popover",
	popoverForeground: "popover-foreground",
	primary: "primary",
	primaryForeground: "primary-foreground",
	secondary: "secondary",
	secondaryForeground: "secondary-foreground",
	muted: "muted",
	mutedForeground: "muted-foreground",
	accent: "accent",
	accentForeground: "accent-foreground",
	destructive: "destructive",
	destructiveForeground: "destructive-foreground",
	border: "border",
	input: "input",
	ring: "ring",
	radius: "radius",
	chart1: "chart-1",
	chart2: "chart-2",
	chart3: "chart-3",
	chart4: "chart-4",
	chart5: "chart-5",
	sidebar: "sidebar",
	sidebarForeground: "sidebar-foreground",
	sidebarPrimary: "sidebar-primary",
	sidebarPrimaryForeground: "sidebar-primary-foreground",
	sidebarAccent: "sidebar-accent",
	sidebarAccentForeground: "sidebar-accent-foreground",
	sidebarBorder: "sidebar-border",
	sidebarRing: "sidebar-ring",
};

// Reverse map for parsing
const CSS_VAR_TO_KEY: Record<string, keyof ThemeVariables> = Object.entries(
	THEME_VAR_MAP,
).reduce(
	(acc, [key, value]) => {
		acc[value] = key as keyof ThemeVariables;
		return acc;
	},
	{} as Record<string, keyof ThemeVariables>,
);

export function formatThemeToCss(theme: ThemeVariables): string {
	let css = ":root {\n";
	for (const [key, cssVar] of Object.entries(THEME_VAR_MAP)) {
		const value = theme[key as keyof ThemeVariables];
		if (value === undefined) continue;

		if (key === "radius") {
			css += `\t--${cssVar}: ${value};\n`;
		} else {
			css += `\t--${cssVar}: oklch(${value});\n`;
		}
	}
	css += "}";
	return css;
}

export function parseCssToTheme(css: string): Record<string, string> {
	const variables: Record<string, string> = {};
	// Robust regex to extract CSS variables
	// Matches: --variable-name: value;
	// Handles optional whitespace, and ensures we capture until the semicolon or closing brace
	const regex = /--([a-z0-9-]+)\s*:\s*([^;}]+)(?:;|(?=\}))?/g;

	for (const match of css.matchAll(regex)) {
		const [, property, value] = match;
		const key = CSS_VAR_TO_KEY[property];

		if (!key) continue;

		let trimmedValue = value.trim();

		// For color variables, strip the oklch() wrapper if present
		if (key !== "radius") {
			const oklchMatch = trimmedValue.match(/^oklch\((.*)\)$/i);
			if (oklchMatch) {
				trimmedValue = oklchMatch[1].trim();
			}
		}

		variables[key] = trimmedValue;
	}

	return variables;
}
