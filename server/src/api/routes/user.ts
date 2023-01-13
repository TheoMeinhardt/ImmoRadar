import asyncHandler from 'express-async-handler';
import { Router } from 'express';

import { authorize } from '../middleware';
import { userControllers } from '../controllers';

const router = Router();

// GETs
router.get('/', authorize, asyncHandler(userControllers.getAllUsers));
router.get('/:id', authorize, asyncHandler(userControllers.getUserById));

// POSTs
router.post('/', asyncHandler(userControllers.addUser));
router.post('/login', asyncHandler(userControllers.login));

// PATCHs
router.patch('/:id', authorize, asyncHandler(userControllers.updateUser));

// DELETEs
router.delete('/:id', authorize, asyncHandler(userControllers.deleteUser));

export default router;
