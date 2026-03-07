import * as z from "zod";

export const UserScalarFieldEnumSchema = z.enum([
	"id",
	"name",
	"email",
	"emailVerified",
	"image",
	"createdAt",
	"updatedAt",
	"role",
	"banned",
	"banReason",
	"banExpires",
	"isAnonymous",
]);

export type UserScalarFieldEnum = z.infer<typeof UserScalarFieldEnumSchema>;
