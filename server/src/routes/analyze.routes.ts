import { Router } from 'express';
import { analyzeController } from '../controllers/analyze.controller.js';

export const analyzeRouter = Router();

analyzeRouter.post('/analyze', analyzeController);

