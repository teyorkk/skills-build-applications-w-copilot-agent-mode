import { Router } from 'express';
import { Activity } from '../models/activity.js';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    response.json(await Activity.find().populate('userId', 'name email').sort({ recordedAt: -1 }));
  } catch (error) {
    next(error);
  }
});

export default router;
