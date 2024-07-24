import { ZodError } from "zod";

export function getZodErrorMsg(error: ZodError) {
  const { errors } = error;
  return errors.map(({ message }) => message).join(", ");
}
