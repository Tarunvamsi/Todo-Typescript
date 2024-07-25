import { ZodError } from "zod";
import { ApiErrorMessage } from "./types";
import { getZodErrorMsg } from "./zod";
import { StatusCodes } from "http-status-codes";

export const getApiError = (
  e: Error
): {
  status: number;
  apiError: ApiErrorMessage;
} => {
  let apiError: ApiErrorMessage;

  if (e instanceof ZodError) {
    console.log(JSON.stringify(e));
    apiError = { msg: getZodErrorMsg(e) };
    return { apiError: apiError, status: StatusCodes.BAD_REQUEST };
  }

  apiError = { msg: "Internal Server error" };
  return { apiError: apiError, status: 500 };
};
