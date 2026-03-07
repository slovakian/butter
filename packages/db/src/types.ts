import type { ThemeVariables as SharedThemeVariables } from "@butter/shared";

declare global {
	namespace PrismaJson {
		type ThemeVariables = SharedThemeVariables;
	}
}
