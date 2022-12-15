import { Router } from 'express';
import LearnModuleController from '../controllers/learnModuleController.js';
import authMiddleware from '../middleware/authMiddleware.js'

const router = Router();

router.get('/:id', authMiddleware, LearnModuleController.getLearnModule);
router.post("/check-card/:id", authMiddleware, LearnModuleController.checkCardAnswer);

export default router;