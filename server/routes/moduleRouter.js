import { Router } from "express";
import moduleController from '../controllers/moduleController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.get("/", authMiddleware, moduleController.getModules);
router.get("/:id", moduleController.viewModule);
router.post("/", authMiddleware, moduleController.createModule);
router.put("/:id", authMiddleware, moduleController.updateModule);
router.delete("/:id", authMiddleware, moduleController.deleteModule);

export default router;