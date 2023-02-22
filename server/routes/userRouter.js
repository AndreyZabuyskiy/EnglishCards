import Router from 'express';
import userController from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { registerValidation, loginValidation } from '../validations/auth.js';

const router = new Router();

router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.post("/registration", registerValidation, userController.register);
router.post("/login", loginValidation, userController.login);
router.post("/logout", userController.logout);

export default router;