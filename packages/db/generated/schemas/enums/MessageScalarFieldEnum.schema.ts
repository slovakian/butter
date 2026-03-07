import * as z from "zod";

export const MessageScalarFieldEnumSchema = z.enum([
	"id",
	"content",
	"pageNumber",
	"chatroomId",
	"userId",
]);

export type MessageScalarFieldEnum = z.infer<
	typeof MessageScalarFieldEnumSchema
>;
