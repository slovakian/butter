import type { ThemeVariables } from "@butter/shared/themes/types";
import { themeVariablesSchema } from "@butter/shared/themes/validation";
import type React from "react";

export function buildThemeStyles(
	data: ThemeVariables,
	options: { throw?: boolean } = {},
): React.CSSProperties | undefined {
	const { throw: shouldThrow = false } = options;

	try {
		const result = themeVariablesSchema.safeParse(data);
		if (!result.success) {
			console.error("[buildThemeStyles] Validation failed:", result.error);
			if (shouldThrow) throw result.error;
			return undefined;
		}
		const theme = result.data;

		if (!theme) return undefined;

		return {
			"--background": `oklch(${theme.background})`,
			"--foreground": `oklch(${theme.foreground})`,
			"--card": `oklch(${theme.card})`,
			"--card-foreground": `oklch(${theme.cardForeground})`,
			"--popover": `oklch(${theme.popover})`,
			"--popover-foreground": `oklch(${theme.popoverForeground})`,
			"--primary": `oklch(${theme.primary})`,
			"--primary-foreground": `oklch(${theme.primaryForeground})`,
			"--secondary": `oklch(${theme.secondary})`,
			"--secondary-foreground": `oklch(${theme.secondaryForeground})`,
			"--muted": `oklch(${theme.muted})`,
			"--muted-foreground": `oklch(${theme.mutedForeground})`,
			"--accent": `oklch(${theme.accent})`,
			"--accent-foreground": `oklch(${theme.accentForeground})`,
			"--destructive": `oklch(${theme.destructive})`,
			"--destructive-foreground": `oklch(${theme.destructiveForeground})`,
			"--border": `oklch(${theme.border})`,
			"--input": `oklch(${theme.input})`,
			"--ring": `oklch(${theme.ring})`,
			"--radius": `${theme.radius}rem`,
			"--chart-1": `oklch(${theme.chart1})`,
			"--chart-2": `oklch(${theme.chart2})`,
			"--chart-3": `oklch(${theme.chart3})`,
			"--chart-4": `oklch(${theme.chart4})`,
			"--chart-5": `oklch(${theme.chart5})`,
			"--sidebar": `oklch(${theme.sidebar})`,
			"--sidebar-foreground": `oklch(${theme.sidebarForeground})`,
			"--sidebar-primary": `oklch(${theme.sidebarPrimary})`,
			"--sidebar-primary-foreground": `oklch(${theme.sidebarPrimaryForeground})`,
			"--sidebar-accent": `oklch(${theme.sidebarAccent})`,
			"--sidebar-accent-foreground": `oklch(${theme.sidebarAccentForeground})`,
			"--sidebar-border": `oklch(${theme.sidebarBorder})`,
			"--sidebar-ring": `oklch(${theme.sidebarRing})`,
			"--topbar": `oklch(${theme.topbar})`,
			"--topbar-foreground": `oklch(${theme.topbarForeground})`,
			"--topbar-primary": `oklch(${theme.topbarPrimary})`,
			"--topbar-primary-foreground": `oklch(${theme.topbarPrimaryForeground})`,
			"--topbar-accent": `oklch(${theme.topbarAccent})`,
			"--topbar-accent-foreground": `oklch(${theme.topbarAccentForeground})`,
			"--topbar-border": `oklch(${theme.topbarBorder})`,
			"--topbar-ring": `oklch(${theme.topbarRing})`,
		} as React.CSSProperties;
	} catch (e) {
		if (shouldThrow) throw e;
		return undefined;
	}
}
