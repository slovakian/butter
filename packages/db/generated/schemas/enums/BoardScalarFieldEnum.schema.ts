import * as z from "zod";

export const BoardScalarFieldEnumSchema = z.enum([
	"id",
	"name",
	"slug",
	"logo",
	"isOfficial",
	"createdAt",
	"metadata",
	"themeId",
]);

export type BoardScalarFieldEnum = z.infer<typeof BoardScalarFieldEnumSchema>;
