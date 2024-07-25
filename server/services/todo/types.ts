import { Types } from "mongoose";
import { z } from "zod";

export const createTodoSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  description: z.string({ required_error: "Description is required" }),
  dueDate: z.string({ required_error: "Duedate is required" }).date(),
  userId: z.string().refine((val) => {
    return Types.ObjectId.isValid(val);
  }, "Invalid todo Id"),
});

export const updateTodoSchema = z.object({
  id: z.string().refine((val) => {
    return Types.ObjectId.isValid(val);
  }, "Invalid todo Id"),
  completed: z.boolean(),
});

export interface todoResponse {
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  id: Types.ObjectId;
}

export type todoListResponse = todoResponse[]
