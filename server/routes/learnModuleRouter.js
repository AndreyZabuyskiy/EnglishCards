import { Router } from "express";
import learnModuleController from "../controllers/learnModuleController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get('/:id', authMiddleware, learnModuleController.getLearnModule);
router.get('/get-round/:id', authMiddleware, learnModuleController.getLearnRoundByModuleId);
router.get('/get-card/:id', authMiddleware, learnModuleController.getLearnCardByRoundId);

export default router;