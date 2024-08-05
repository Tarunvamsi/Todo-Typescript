import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { createProject, deleteProject, editProject, getProjects } from '../services/project';
import { canAccessProject } from '../middlewares/permission';

const router = Router();

router.post('/projects', authenticate, createProject);
router.get('/projects', authenticate, getProjects);
router.put('/projects/:projectId', authenticate, canAccessProject, editProject);
router.delete('/projects/:projectId', authenticate, canAccessProject, deleteProject)

export default router;
