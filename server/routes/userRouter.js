import Router from 'express';
import userController from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { check } from 'express-validator';

const router = new Router();

router.post(
  "/registration",
  [
    check('login', 'Invalid login').isLength({ min: 4 }),
    check('password', 'Minimum password length 6 characters').isLength({ min: 4 })
  ],
 userController.registration);

router.post(
  "/login",
  [
    check('login', 'Invalid login').isLength({ min: 4 }),
    check('password', 'Minimum password length 6 characters').isLength({ min: 4 })
  ],
  userController.login);

router.get("/auth", authMiddleware, userController.check);

export default router;