import { Router } from 'express';
import LearnModuleController from '../controllers/learnModuleController.js';
import authMiddleware from '../middleware/authMiddleware.js'

const router = Router();

router.get('/:id', authMiddleware, LearnModuleController.getLearnModule);
router.post("/check-card/:id", authMiddleware, LearnModuleController.checkCardAnswer);
router.get('/write-module/:id', authMiddleware, LearnModuleController.getResultWriteModule);
router.get('/remove-module/:id', authMiddleware, LearnModuleController.removeLearnModuleById);

export default router;