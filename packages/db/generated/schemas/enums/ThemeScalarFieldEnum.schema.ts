import * as z from "zod";

export const ThemeScalarFieldEnumSchema = z.enum([
	"id",
	"name",
	"isDark",
	"variables",
	"createdAt",
	"updatedAt",
	"userId",
]);

export type ThemeScalarFieldEnum = z.infer<typeof ThemeScalarFieldEnumSchema>;
