import { Router } from "express";
import moduleController from '../controllers/moduleController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { moduleValidation } from "../validations/module.js";

const router = Router();

router.get("/", authMiddleware, moduleController.getModules);
router.get("/:id", moduleController.viewModule);
router.post("/", authMiddleware, moduleValidation, moduleController.createModule);
router.patch("/:id", authMiddleware, moduleValidation, moduleController.updateModule);
router.delete("/:id", authMiddleware, moduleController.deleteModule);

router.post("/upload-image", authMiddleware, moduleController.uploadImage);
router.delete("/remove-image/:id", authMiddleware, moduleController.removeImage);

export default router;