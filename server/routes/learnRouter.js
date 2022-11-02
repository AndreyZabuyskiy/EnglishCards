import { Router } from 'express';
import LearnModuleController from '../controllers/learnModuleController.js';
import authMiddleware from '../middleware/authMiddleware.js'

const router = Router();

router.get('/:id', authMiddleware, LearnModuleController.getLearnModule);

export default router;