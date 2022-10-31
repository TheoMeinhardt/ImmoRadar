import asyncHandler from 'express-async-handler';
import { Router } from 'express';

import { userControllers } from '../controllers';

const router = Router();

// GETs
router.get('/', asyncHandler(userControllers.getAllUsers));
router.get('/:id', asyncHandler(userControllers.getUserById));

// POSTs
router.post('/', asyncHandler(userControllers.addUser));

// PATCHs
router.patch('/:id', asyncHandler(userControllers.updateUser));

// DELETEs
router.delete('/:id', asyncHandler(userControllers.deleteUser));

export default router;
