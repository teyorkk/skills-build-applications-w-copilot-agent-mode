import { Router } from 'express';
import { Workout } from '../models/workout.js';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    response.json(await Workout.find().sort({ title: 1 }));
  } catch (error) {
    next(error);
  }
});

export default router;
