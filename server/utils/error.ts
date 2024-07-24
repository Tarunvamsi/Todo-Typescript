import { ZodError } from "zod";
import { ApiErrorMessage } from "./types";
import { getZodErrorMsg } from "./zod";

export const getApiError = (
  e: Error
): {
  status: number;
  apiError: ApiErrorMessage;
} => {
  let apiError: ApiErrorMessage;

  if (e instanceof ZodError) {
    apiError = { msg: getZodErrorMsg(e) };
    return { apiError: apiError, status: 400 };
  }

  apiError = { msg: "Internal Server error" };
  return { apiError: apiError, status: 500 };
};
