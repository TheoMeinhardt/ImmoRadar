import asyncHandler from 'express-async-handler';
import { Router } from 'express';

import { userControllers } from '../controllers';

const router = Router();

// GETs
router.get('/', asyncHandler(userControllers.getAllUsers));
router.get('/:id', asyncHandler(userControllers.getUserById));

// POSTs
router.post('/', asyncHandler(userControllers.addUser));

export default router;
