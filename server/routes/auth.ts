import { Router } from "express";
import { createUser, loginUser, logoutUser } from "../services/auth";
import { validateUserLogin } from "../middlewares/auth";

const router = Router();

router.post("/signup", createUser);
router.post("/login", validateUserLogin, loginUser);
router.post("/logout", logoutUser);

export default router;
