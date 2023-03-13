import { Router } from "express";
import memorizationController from "../controllers/memorizationController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = new Router();

router.get('/:id', authMiddleware, memorizationController.getModule);

export default router;