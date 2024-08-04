import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../../models/User";
import { createUserSchema, LoginResponse, loginUserSchema } from "./types";
import { JWT_EXPIRY, JWT_SECRET } from "../../utils/constants";
import { getApiError } from "../../utils/error";
import { StatusCodes } from "http-status-codes";
import Token from "../../models/Token";
import { Types } from "mongoose";

const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = createUserSchema.parse(req.body);

    // Validation for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "email Already exist" });
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

    await Token.create({ userId: user._id, token });
    res.status(StatusCodes.CREATED).json(response);
  } catch (error) {
    const { status, apiError } = getApiError(error as Error);
    res.status(status).json(apiError);
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email } = loginUserSchema.parse(req.body);

  const user = await User.findOne({ email });

  const token = jwt.sign(
    { userId: user!._id, email: user!.email },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRY,
    }
  );

  const response: LoginResponse = {
    token,
  };
  await Token.create({ userId: user!._id, token });

  res.status(StatusCodes.OK).json(response);
};

const logoutUser = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];

  await Token.findOneAndDelete({ token });

  res.status(StatusCodes.OK).json({ msg: "Logged out successfully" });
};

const logoutAllDevices = async (req: Request, res: Response) => {
  const userId = req.body.userId as Types.ObjectId;
  const x = await Token.deleteMany({ userId });
  console.log(x, userId);

  res
    .status(StatusCodes.OK)
    .json({ msg: "Logged out of all devices successfully" });
};

export { createUser, loginUser, logoutUser, logoutAllDevices };
