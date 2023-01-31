import asyncHandler from 'express-async-handler';
import { Router } from 'express';

import { userControllers, session } from '../controllers';

const router = Router();

// GETs
router.get('/', asyncHandler(userControllers.getAllUsers));
router.get('/:id', asyncHandler(userControllers.getUserById));
router.get('/stripe/:id', asyncHandler(session.getSessionID));

// POSTs
router.post('/', asyncHandler(userControllers.addUser));
router.post('/login', asyncHandler(userControllers.login));

// PATCHs
router.patch('/:id', asyncHandler(userControllers.updateUser));
router.patch('/stripe/:id', asyncHandler(session.patchSessionID));

// DELETEs
router.delete('/:id', asyncHandler(userControllers.deleteUser));

export default router;
