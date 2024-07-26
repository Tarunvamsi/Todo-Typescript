import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { createProject, editProject, getProjects } from '../services/project';
import { canAccessProject } from '../middlewares/permission';

const router = Router();

router.post('/projects', authenticate, createProject);
router.get('/projects', authenticate, getProjects);
router.put('/projects/:projectId', authenticate, canAccessProject, editProject);

export default router;
