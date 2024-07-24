import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "../utils/constants";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { loginUserSchema } from "../services/auth/types";
import User from "../models/User";
import bcrypt from "bcryptjs";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: Types.ObjectId;
    };
    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Unauthorized" });
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
      return res.status(404).json({ msg: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ msg: "Incorrect password" });
    }

    next();
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
