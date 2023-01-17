import asyncHandler from 'express-async-handler';
import { Router } from 'express';

import { authorize } from '../middleware';
import { jwtScope } from '../types';
import { userControllers } from '../controllers';

const router = Router();

// GETs
router.get('/', authorize(jwtScope.apiadmin), asyncHandler(userControllers.getAllUsers));
router.get('/:id', authorize(jwtScope.apiuser), asyncHandler(userControllers.getUserById));

// POSTs
router.post('/', asyncHandler(userControllers.addUser));
router.post('/login', asyncHandler(userControllers.login));
router.post('/guest', asyncHandler(userControllers.guestlogin));

// PATCHs
router.patch('/:id', authorize(jwtScope.apiuser), asyncHandler(userControllers.updateUser));

// DELETEs
router.delete('/:id', authorize(jwtScope.apiuser), asyncHandler(userControllers.deleteUser));

export default router;
