import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import bcrypt from "bcryptjs";

const createUser = async (req: Request, res: Response) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ msg: "email Already exist" });
    }

    const user = await User.create(req.body);

    const token = jwt.sign({ user: user._id, email: user.email }, "secret", {
      expiresIn: "20d",
    });
    res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        password: user.password,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ msg: "SignUp failed" });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = jwt.sign(
          { user: user._id, email: user.email },
          "secret",
          {
            expiresIn: "20d",
          }
        );
        res.status(201).json({
          user: {
            id: user._id,
            email: user.email,
            password: user.password,
          },
          token,
        });
      } else {
        return res.status(400).json({ msg: "incorrect password" });
      }
    } else {
      return res.status(400).json({ msg: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ msg: "login failed" });
  }
};


export  { createUser, loginUser };
