import { Router } from "express";
import { Request, Response } from "express";
import {
  createUser,
  loginUser,
  validateUserLogin,
} from "../services/AuthService";

const router = Router();

router.post("/signup", createUser);
router.post("/login", validateUserLogin, loginUser);
router.post("/logout", (req: Request, res: Response) => {
  res.status(200).json({ msg: "Logged out successfully" });
});

export default router;
