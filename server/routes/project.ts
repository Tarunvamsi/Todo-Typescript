import { Router } from "express";
import { authenticate } from "../middlewares/auth";
import { createProject, getProjects } from "../services/project";

const router = Router();

router.post("/projects", authenticate, createProject);
router.get("/projects", authenticate, getProjects);

export default router;
