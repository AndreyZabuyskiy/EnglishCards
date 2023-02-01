import { Router } from "express";
import testModuleController from '../controllers/testModuleController.js';
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get('/:id', authMiddleware, testModuleController.getTestModule);
router.post('/:id', authMiddleware, testModuleController.checkTest);

export default router;