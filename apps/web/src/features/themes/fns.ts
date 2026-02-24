import type { ThemeInsert, ThemeVariables } from "@butter/shared/themes/types";
import { createServerFn } from "@tanstack/react-start";

export const fetchTheme = createServerFn({ method: "GET" }).handler(() => {
	return BioluminescenceTheme;
});

const BioluminescenceTheme: ThemeInsert = {
	name: "Abyssal Glow",
	slug: "abyssal-glow",
	isDark: true,
	variables: {
		// Background: The midnight zone—pitch black with the faintest hint of deep blue
		background: "0.18 0.02 250",
		// Foreground: Piercing, icy starlight white
		foreground: "0.95 0.02 245",

		// Cards: Just a few fathoms shallower, slightly visible in the dark
		card: "0.22 0.04 255",
		cardForeground: "0.95 0.02 245",

		popover: "0.22 0.04 255",
		popoverForeground: "0.95 0.02 245",

		// Primary: Electric jellyfish cyan—bright, vibrant, and glowing
		primary: "0.80 0.18 220",
		primaryForeground: "0.15 0.05 230", // Dark text on the glowing cyan

		// Secondary: Deep-sea coral purple/violet
		secondary: "0.45 0.15 300",
		secondaryForeground: "0.95 0.05 300",

		// Muted: Murky waters—low saturation, faded blue-grey
		muted: "0.28 0.05 255",
		mutedForeground: "0.70 0.05 255",

		// Accent: Neon algae green—highly saturated for hover states
		accent: "0.85 0.22 150",
		accentForeground: "0.12 0.05 150",

		// Destructive: Toxic anemone red/orange
		destructive: "0.65 0.25 35",
		destructiveForeground: "0.98 0.02 30",

		// Borders/Inputs: Faint, bioluminescent outlines in the dark
		border: "0.32 0.08 255",
		input: "0.32 0.08 255",

		// Focus Ring: Matches the electric cyan glow of the primary color
		ring: "0.80 0.18 220",

		// Charts: A vibrant spectrum of glowing sea life
		chart1: "0.80 0.18 220", // Electric Cyan (Primary)
		chart2: "0.85 0.22 150", // Neon Green (Accent)
		chart3: "0.65 0.25 330", // Bright Magenta
		chart4: "0.75 0.20 80", // Bioluminescent Yellow
		chart5: "0.50 0.20 280", // Deep Purple

		// Sidebar: Sinks seamlessly into the abyssal background
		sidebar: "0.18 0.02 250", // Matches base background
		sidebarForeground: "0.95 0.02 245",
		sidebarPrimary: "0.80 0.18 220", // Glowing cyan links/active states
		sidebarPrimaryForeground: "0.15 0.05 230",
		sidebarAccent: "0.28 0.05 255", // Murky waters for hover
		sidebarAccentForeground: "0.95 0.02 245",
		sidebarBorder: "0.32 0.08 255",
		sidebarRing: "0.80 0.18 220",

		// Sharp, modern corners to contrast the organic glow
		radius: "0.375rem",
	},
};

const CheesecakeThem: ThemeInsert = {
	name: "Classic Cheesecake",
	slug: "classic-cheesecake",
	isDark: false,
	variables: {
		// Background: Rich, off-white heavy cream
		background: "0.98 0.05 45",
		// Foreground: Deep espresso roast for sharp, readable text
		foreground: "0.15 0.10 25",

		// Cards: Slightly warmer, buttery cream
		card: "0.96 0.08 45",
		cardForeground: "0.15 0.10 25",

		popover: "0.96 0.08 45",
		popoverForeground: "0.15 0.10 25",

		// Primary: Golden-brown graham cracker crust
		primary: "0.45 0.40 35",
		primaryForeground: "0.98 0.05 45",

		// Secondary: Pale New York style filling (buttery yellow)
		secondary: "0.92 0.20 50",
		secondaryForeground: "0.25 0.15 25",

		// Muted: Soft, whipped cream finish
		muted: "0.94 0.05 45",
		mutedForeground: "0.45 0.10 25",

		// Accent: A hint of honey or lemon zest
		accent: "0.85 0.30 55",
		accentForeground: "0.15 0.10 25",

		// Destructive: Fresh strawberry reduction (Deep Red)
		destructive: "0.50 0.60 10",
		destructiveForeground: "1 0 0",

		// Borders/Inputs: Subtle crust-colored edges
		border: "0.85 0.15 35",
		input: "0.85 0.15 35",

		// Focus Ring: Matches the golden-brown primary
		ring: "0.45 0.40 35",

		// Charts: Distinct flavors for data visualization
		chart1: "0.45 0.40 35", // Graham Cracker (Primary)
		chart2: "0.50 0.60 10", // Strawberry (Destructive)
		chart3: "0.85 0.30 55", // Lemon (Accent)
		chart4: "0.70 0.20 140", // Mint/Pistachio (Fresh Green)
		chart5: "0.60 0.25 280", // Blueberry (Deep Purple)

		// Sidebar: Matches the card/cream aesthetic
		sidebar: "0.96 0.08 45", // Card background
		sidebarForeground: "0.15 0.10 25", // Foreground
		sidebarPrimary: "0.45 0.40 35", // Primary
		sidebarPrimaryForeground: "0.98 0.05 45", // Primary Foreground
		sidebarAccent: "0.94 0.05 45", // Muted/Whipped Cream
		sidebarAccentForeground: "0.15 0.10 25",
		sidebarBorder: "0.85 0.15 35", // Border
		sidebarRing: "0.45 0.40 35", // Ring

		// Smooth, rounded corners (not quite as "bubbly" as cupcake)
		radius: "0.75rem",
	},
};
