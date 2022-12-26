import { Router } from 'express';
import WriteModuleController from '../controllers/writeModuleController.js';
import authMiddleware from '../middleware/authMiddleware.js'

const router = Router();

router.get('/:id', authMiddleware, WriteModuleController.getLearnModule);
router.post("/check-card/:id", authMiddleware, WriteModuleController.checkCardAnswer);
router.get('/write-module/:id', authMiddleware, WriteModuleController.getResultWriteModule);
router.get('/remove-module/:id', authMiddleware, WriteModuleController.removeLearnModuleById);

export default router;