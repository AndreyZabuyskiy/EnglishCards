import { Router } from 'express';
import LearnModuleController from '../controllers/learnModuleController.js';

const router = Router();

router.get('/', LearnModuleController.getLearnModule);

export default router;