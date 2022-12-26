import { Router } from "express";
import learnModuleController from "../controllers/learnModuleController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get('/:id', authMiddleware, learnModuleController.getLearnModule);

export default router;