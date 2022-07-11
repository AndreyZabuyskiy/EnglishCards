import { Router } from "express";
import moduleController from '../controllers/moduleController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.post("/", authMiddleware, moduleController.createModule);
router.get("/", authMiddleware, moduleController.getModules);
router.get("/:id", moduleController.viewModule);
router.put("/:id", authMiddleware, moduleController.updateModule);

export default router;