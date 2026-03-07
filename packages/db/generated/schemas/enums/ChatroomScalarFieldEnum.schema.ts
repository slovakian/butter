import * as z from "zod";

export const ChatroomScalarFieldEnumSchema = z.enum([
	"id",
	"name",
	"slug",
	"boardId",
]);

export type ChatroomScalarFieldEnum = z.infer<
	typeof ChatroomScalarFieldEnumSchema
>;
