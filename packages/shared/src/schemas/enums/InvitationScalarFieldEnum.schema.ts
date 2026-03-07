import * as z from 'zod';

export const InvitationScalarFieldEnumSchema = z.enum(['id', 'boardId', 'email', 'role', 'status', 'expiresAt', 'createdAt', 'inviterId'])

export type InvitationScalarFieldEnum = z.infer<typeof InvitationScalarFieldEnumSchema>;