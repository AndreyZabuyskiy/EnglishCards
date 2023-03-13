import { Router } from "express";
import memorizationController from "../controllers/memorizationController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = new Router();

router.get('/:id', authMiddleware, memorizationController.getModule);
router.post('/add-card/:id', authMiddleware, memorizationController.addCard);
router.delete('/remove-card/:id', authMiddleware, memorizationController.removeCard);

export default router;