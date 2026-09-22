import { Router } from 'express';
import { Leaderboard } from '../models/leaderboard.js';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    response.json(await Leaderboard.find().populate('userId', 'name email').sort({ rank: 1 }));
  } catch (error) {
    next(error);
  }
});

export default router;
