import { Router } from 'express';
import { User } from '../models/user.js';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    response.json(await User.find().sort({ name: 1 }));
  } catch (error) {
    next(error);
  }
});

export default router;
