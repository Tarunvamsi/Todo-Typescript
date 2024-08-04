import { Router } from "express";
import {
  createUser,
  loginUser,
  logoutAllDevices,
  logoutUser,
} from "../services/auth";
import { authenticate, validateUserLogin } from "../middlewares/auth";

const router = Router();

router.post("/signup", createUser);
router.post("/login", validateUserLogin, loginUser);
router.post("/logout", authenticate, logoutUser);
router.post("/logout-all", authenticate, logoutAllDevices);
export default router;
