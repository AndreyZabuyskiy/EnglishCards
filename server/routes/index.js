import Router from 'express';
import userRouter from './userRouter.js';
import moduleRouter from './moduleRouter.js';
import writeModuleRouter from './writeModuleRouter.js';
import learnModuleRouter from './learnModuleRouter.js';
import testModuleRouter from './testModuleRouter.js'
import memorizationRouter from './memorizationRouter.js'

const router = new Router();
router.use("/user", userRouter);
router.use("/module", moduleRouter);
router.use("/write-module", writeModuleRouter);
router.use("/learn-module", learnModuleRouter);
router.use("/test-module", testModuleRouter);
router.use("/memorization", memorizationRouter);

export default router;