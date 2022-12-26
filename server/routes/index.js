import Router from 'express';
import userRouter from './userRouter.js';
import moduleRouter from './moduleRouter.js';
import writeModuleRouter from './writeModuleRouter.js';

const router = new Router();
router.use("/user", userRouter);
router.use("/module", moduleRouter);
router.use("/write-module", writeModuleRouter);

export default router;