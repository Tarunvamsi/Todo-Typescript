import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { ApiErrorMessage } from "../utils/types";
import { StatusCodes } from "http-status-codes";

export const validTodoId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    const error: ApiErrorMessage = {
      msg: "Invalid todo Id",
    };
    return res.status(StatusCodes.BAD_REQUEST).json(error);
  }

  next();
};
