import { ZodError } from "zod";

export function getZodErrorMsg(error: ZodError) {
  const { errors } = error;
  return errors[0].message;
}
