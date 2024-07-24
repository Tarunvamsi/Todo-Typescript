import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../../models/User";
import { createUserSchema, LoginResponse, loginUserSchema } from "./types";
import { JWT_EXPIRY, JWT_SECRET } from "../../utils/constants";
import { getApiError } from "../../utils/error";

const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = createUserSchema.parse(req.body);

    // Validation for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "email Already exist" });
    }

    const user = await User.create({ email, password, username });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRY,
      }
    );

    const response: LoginResponse = {
      token,
    };
    res.status(201).json(response);
  } catch (error) {
    const { status, apiError } = getApiError(error as Error);
    res.status(status).json(apiError);
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


export { createUser, loginUser };
