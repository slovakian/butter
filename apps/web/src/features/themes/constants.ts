import type { ThemeInsert } from "@butter/shared/themes/types";

export const DEFAULT_THEME = {
	isDark: true,
	// oklch colors and rem radius
	variables: {
		background: "0.25 0.02 90", // Dark dirt/stone background
		foreground: "0.98 0 0", // White text
		card: "0.35 0.02 90", // Lighter stone for cards
		cardForeground: "0.98 0 0",
		popover: "0.25 0.02 90",
		popoverForeground: "0.98 0 0",
		primary: "0.6 0.18 145", // Grass Green
		primaryForeground: "0.98 0 0",
		secondary: "0.45 0.05 70", // Stone/Cobblestone
		secondaryForeground: "0.98 0 0",
		muted: "0.3 0.02 90",
		mutedForeground: "0.7 0 0",
		accent: "0.85 0.15 230", // Diamond Blue
		accentForeground: "0.15 0 0",
		destructive: "0.5 0.2 25", // TNT Red
		destructiveForeground: "0.98 0 0",
		border: "0.5 0.02 90",
		input: "0.2 0.02 90",
		ring: "0.6 0.18 145",
		radius: "0", // Blocky!
		chart1: "0.6 0.18 145", // Green
		chart2: "0.48 0.12 60", // Dirt
		chart3: "0.85 0.15 230", // Diamond
		chart4: "0.9 0.15 95", // Gold
		chart5: "0.4 0.2 25", // Redstone
		sidebar: "0.2 0.02 90",
		sidebarForeground: "0.98 0 0",
		sidebarPrimary: "0.6 0.18 145",
		sidebarPrimaryForeground: "0.98 0 0",
		sidebarAccent: "0.3 0.02 90",
		sidebarAccentForeground: "0.98 0 0",
		sidebarBorder: "0.5 0.02 90",
		sidebarRing: "0.6 0.18 145",
		topbar: "0.2 0.02 90",
		topbarForeground: "0.98 0 0",
		topbarPrimary: "0.6 0.18 145",
		topbarPrimaryForeground: "0.98 0 0",
		topbarAccent: "0.3 0.02 90",
		topbarAccentForeground: "0.98 0 0",
		topbarBorder: "0.5 0.02 90",
		topbarRing: "0.6 0.18 145",
	},
} satisfies Omit<ThemeInsert, "userId" | "id" | "name">;
