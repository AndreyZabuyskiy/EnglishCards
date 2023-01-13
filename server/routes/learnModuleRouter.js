import { Router } from "express";
import learnModuleController from "../controllers/learnModuleController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get('/:id', authMiddleware, learnModuleController.getLearnModule);
router.get('/get-round-by-module/:id', authMiddleware, learnModuleController.getLearnRoundByModuleId);
router.get('/get-round/:id', authMiddleware, learnModuleController.getLearnRoundById);
router.get('/get-card/:id', authMiddleware, learnModuleController.getLearnCardByRoundId);
router.get('/result-round/:id', authMiddleware, learnModuleController.getResultRoundById);
router.get('/create-round/:id', authMiddleware, learnModuleController.createRound);
router.get('/completion-check-module/:id', authMiddleware, learnModuleController.completionCheckModule);
router.get('/count-learned-cards/:id', authMiddleware, learnModuleController.getCountLearnCards);

router.post('/check-test-card/:id', authMiddleware, learnModuleController.checkLearnTestCard);
router.post('/check-write-card/:id', authMiddleware, learnModuleController.checkLearnWriteCard);

router.delete('/delete-module/:id', authMiddleware, learnModuleController.deleteModuleById);

export default router;