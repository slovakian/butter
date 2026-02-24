import { z } from "zod";

/**
 * Matches: "Lightness Chroma Hue" or "oklch(Lightness Chroma Hue / Alpha)"
 * L: 0-1 decimal or 0-100%
 * C: 0-0.4 decimal (usually stays below 0.3)
 * H: 0-360
 * Alpha (optional): 0-1 decimal or 0-100%
 */
const oklchSchema = z
	.string()
	.describe(
		"OKLCH format: 'L C H' or 'L C H / alpha'. " +
			"Examples: '0.98 0.01 45', '1 0 0 / 10%', or 'oklch(1 0 0)'.",
	)
	.regex(
		/^(?:oklch\(\s*)?(\d+(\.\d+)?%?)\s+(\d+(\.\d+)?)\s+(\d+(\.\d+)?)(?:\s*\/\s*(\d+(\.\d+)?%?))?(?:\s*\))?$/,
		{
			message:
				"Invalid OKLCH format. Expected space-separated L C H with optional alpha (e.g., '0.9 0.02 45' or '1 0 0 / 10%').",
		},
	);

const remSchema = z
	.string()
	.describe("CSS rem unit. Examples: '0.5rem', '.75rem'.")
	.regex(/^-?(\d*\.?\d+)rem$/, "Invalid REM unit format.");

export const themeVariablesSchema = z.object({
	// Base Colors
	background: oklchSchema,
	foreground: oklchSchema,
	card: oklchSchema,
	cardForeground: oklchSchema,
	popover: oklchSchema,
	popoverForeground: oklchSchema,
	primary: oklchSchema,
	primaryForeground: oklchSchema,
	secondary: oklchSchema,
	secondaryForeground: oklchSchema,
	muted: oklchSchema,
	mutedForeground: oklchSchema,
	accent: oklchSchema,
	accentForeground: oklchSchema,
	destructive: oklchSchema,
	destructiveForeground: oklchSchema,
	border: oklchSchema,
	input: oklchSchema,
	ring: oklchSchema,

	// Charts
	chart1: oklchSchema,
	chart2: oklchSchema,
	chart3: oklchSchema,
	chart4: oklchSchema,
	chart5: oklchSchema,

	// Sidebar
	sidebar: oklchSchema,
	sidebarForeground: oklchSchema,
	sidebarPrimary: oklchSchema,
	sidebarPrimaryForeground: oklchSchema,
	sidebarAccent: oklchSchema,
	sidebarAccentForeground: oklchSchema,
	sidebarBorder: oklchSchema,
	sidebarRing: oklchSchema,

	// Layout
	radius: remSchema.optional(), // Optional since it usually only exists on :root
});

export const themeSchema = z.object({
	id: z.number().int(), // Note: Changed z.int() to z.number().int() for correct Zod syntax
	name: z.string(),
	slug: z.string(),
	isDark: z.boolean(),
	variables: themeVariablesSchema,
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const themeInsertSchema = themeSchema.partial({
	id: true,
	createdAt: true,
	updatedAt: true,
});
