import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "../utils/constants";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { loginUserSchema } from "../services/auth/types";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import Token from "../models/Token";

export const authenticate =async  (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: Types.ObjectId;
    };

    const tokenExists = await Token.findOne({ token });
    if (!tokenExists) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Unauthorized" });
    }

    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Unauthorized" });
  }
};

export const validateUserLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = loginUserSchema.parse(req.body);

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Incorrect password" });
    }

    next();
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
