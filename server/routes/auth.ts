import { Router } from "express";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { createUser, loginUser } from "../controllers/authController";

const router = Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.post("/logout", (req: Request, res: Response) => {
    res.status(200).json({ msg: "Logged out successfully" });
  });

export default router;
