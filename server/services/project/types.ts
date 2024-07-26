import { Types } from 'mongoose';
import { z } from 'zod';

export const createProjectSchema = z.object({
    title: z
        .string({ required_error: 'Title is required' })
        .min(1, 'Title cannot be empty'),
    userId: z.string().refine((val) => {
        return Types.ObjectId.isValid(val);
    }, 'Invalid todo Id'),
});

export interface projectResponse {
    id: Types.ObjectId;
    title: string;
    createdAt: Date
}
