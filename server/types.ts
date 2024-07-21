import { z } from 'zod';

export const createTodo = z.object({
  title: z.string(),
  description: z.string(),
  completed: z.boolean(),
});

export const updateTodo = z.object({
  id: z.string(),
  completed: z.boolean(),
});
