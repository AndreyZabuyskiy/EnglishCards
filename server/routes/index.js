import Router from 'express';
import userRouter from './userRouter.js';
import moduleRouter from './moduleRouter.js';

const router = new Router();
router.use("/user", userRouter);
router.use("/module", moduleRouter);

export default router;