import * as z from 'zod';
export const MemberAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    boardId: z.number(),
    board: z.number(),
    userId: z.number(),
    user: z.number(),
    role: z.number(),
    createdAt: z.number()
  }).optional(),
  _sum: z.object({
    id: z.number().nullable(),
    boardId: z.number().nullable(),
    userId: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    id: z.number().nullable(),
    boardId: z.number().nullable(),
    userId: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.number().int().nullable(),
    boardId: z.number().int().nullable(),
    userId: z.number().int().nullable(),
    role: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.number().int().nullable(),
    boardId: z.number().int().nullable(),
    userId: z.number().int().nullable(),
    role: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional()});