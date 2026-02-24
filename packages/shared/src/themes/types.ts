import type z from "zod";
import type {
	themeInsertSchema,
	themeSchema,
	themeVariablesSchema,
} from "./validation";

export type ThemeVariables = z.infer<typeof themeVariablesSchema>;
export type Theme = z.infer<typeof themeSchema>;
export type ThemeInsert = z.infer<typeof themeInsertSchema>;
