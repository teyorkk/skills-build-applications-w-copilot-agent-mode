import { Router } from 'express';
import { Team } from '../models/team.js';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    response.json(await Team.find().sort({ name: 1 }));
  } catch (error) {
    next(error);
  }
});

export default router;
