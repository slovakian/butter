import * as z from 'zod';
export const InvitationGroupByResultSchema = z.array(z.object({
  id: z.number().int(),
  boardId: z.number().int(),
  email: z.string(),
  role: z.string(),
  status: z.string(),
  expiresAt: z.date(),
  createdAt: z.date(),
  inviterId: z.number().int(),
  _count: z.object({
    id: z.number(),
    boardId: z.number(),
    board: z.number(),
    email: z.number(),
    role: z.number(),
    status: z.number(),
    expiresAt: z.number(),
    createdAt: z.number(),
    inviterId: z.number(),
    user: z.number()
  }).optional(),
  _sum: z.object({
    id: z.number().nullable(),
    boardId: z.number().nullable(),
    inviterId: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    id: z.number().nullable(),
    boardId: z.number().nullable(),
    inviterId: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.number().int().nullable(),
    boardId: z.number().int().nullable(),
    email: z.string().nullable(),
    role: z.string().nullable(),
    status: z.string().nullable(),
    expiresAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    inviterId: z.number().int().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.number().int().nullable(),
    boardId: z.number().int().nullable(),
    email: z.string().nullable(),
    role: z.string().nullable(),
    status: z.string().nullable(),
    expiresAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    inviterId: z.number().int().nullable()
  }).nullable().optional()
}));