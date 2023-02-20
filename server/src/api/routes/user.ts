import asyncHandler from 'express-async-handler';
import { Router } from 'express';

import { authorize } from '../middleware';
import { jwtScope } from '../types';
import { userControllers } from '../controllers';
import { getSessionID, getUserBySession, patchSessionID } from '../controllers/stripeServer';

const router = Router();

// GETs
router.get('/', authorize(jwtScope.apiadmin), asyncHandler(userControllers.getAllUsers));
router.get('/:id', authorize(jwtScope.apiuser), asyncHandler(userControllers.getUserById));
router.get('/stripe/user/:id', asyncHandler(getSessionID));
router.get('/stripe/session/:session_id', asyncHandler(getUserBySession));

// POSTs
router.post('/', asyncHandler(userControllers.addUser));
router.post('/login', asyncHandler(userControllers.login));
router.post('/guest', asyncHandler(userControllers.guestlogin));

// PATCHs
router.patch('/:id', authorize(jwtScope.apiuser), asyncHandler(userControllers.updateUser));
router.patch('/stripe/:id', asyncHandler(patchSessionID));

// DELETEs
router.delete('/:id', authorize(jwtScope.apiuser), asyncHandler(userControllers.deleteUser));

export default router;
