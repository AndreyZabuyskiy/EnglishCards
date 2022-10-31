import Router from 'express';
import userRouter from './userRouter.js';
import moduleRouter from './moduleRouter.js';
import learnRouter from './learnRouter.js';

const router = new Router();
router.use("/user", userRouter);
router.use("/module", moduleRouter);
router.use("/learn-module", learnRouter);

export default router;