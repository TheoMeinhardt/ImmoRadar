import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { userControllers } from '../controllers';

const router = Router();

router.get('/', asyncHandler(userControllers.getAllUsers));
router.get('/:id', asyncHandler(userControllers.getUserById));

export default router;
