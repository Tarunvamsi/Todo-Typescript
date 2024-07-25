import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.string().email("Invalid Email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "Password cannot be empty" }),
});

export const createUserSchema = loginUserSchema.extend({
  username: z
    .string({ required_error: "Username is required" })
    .min(1, { message: "Username cannot be empty." }),
});

export interface LoginResponse {
  token: string;
}
