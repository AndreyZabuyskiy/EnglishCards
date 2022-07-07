import Router from 'express';
import userController from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { registerValidation, loginValidation } from '../validations/auth.js';

const router = new Router();

router.post("/registration", registerValidation, userController.registration);
router.post("/login", loginValidation, userController.login);
router.get("/auth", authMiddleware, userController.check);

export default router;