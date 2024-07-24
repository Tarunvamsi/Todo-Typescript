import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../models/User";
import { createUserSchema, LoginResponse, loginUserSchema } from "./types";
import { ApiErrorMessage } from "../../utils/types";
import { ZodError } from "zod";
import { getZodErrorMsg } from "../../utils/zodUtils";
import { JWT_EXPIRY, JWT_SECRET } from "../../utils/constants";

const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = createUserSchema.parse(req.body);

    // Validation for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "email Already exist" });
    }

    const user = await User.create({ email, password, username });

    const token = jwt.sign({ user: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRY,
    });

    const response: LoginResponse = {
      token,
    };
    res.status(201).json(response);
  } catch (error) {
    if (error instanceof ZodError) {
      const apiError: ApiErrorMessage = { msg: getZodErrorMsg(error) };
      return res.status(400).json(apiError);
    }

    res.status(500).json({ msg: "SignUp failed" });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email } = loginUserSchema.parse(req.body);

  const user = await User.findOne({ email });

  const token = jwt.sign({ user: user!._id, email: user!.email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRY,
  });

  const response: LoginResponse = {
    token,
  };

  res.status(200).json(response);
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

export { createUser, loginUser };
