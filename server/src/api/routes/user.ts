import asyncHandler from 'express-async-handler';
import { Router } from 'express';

import { userControllers } from '../controllers';
import { getSessionID, postSessionID } from '../controllers/session.js';

const router = Router();

// GETs
router.get('/', asyncHandler(userControllers.getAllUsers));
router.get('/:id', asyncHandler(userControllers.getUserById));
router.get('/stripe/:id', asyncHandler(getSessionID));

// POSTs
router.post('/', asyncHandler(userControllers.addUser));
router.post('/login', asyncHandler(userControllers.login));

// PATCHs
router.patch('/:id', asyncHandler(userControllers.updateUser));
router.patch('/stripe/:id', asyncHandler(postSessionID));

// DELETEs
router.delete('/:id', asyncHandler(userControllers.deleteUser));
// router.delete('/stripe/:id', asyncHandler(deleteSessionID));

export default router;
