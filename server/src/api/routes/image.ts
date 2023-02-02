import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import { imageControllers } from '../controllers';
import { authorize } from '../middleware';
import { jwtScope } from '../types';

const router = Router();

// POSTs
router.post('/', authorize(jwtScope.apiguest), asyncHandler(imageControllers.getImage));
// router.post('/user/:id', uploadUserProfilePic.single('profilePic'));
router.post('/realestate/:id', authorize(jwtScope.apiuser), asyncHandler(imageControllers.postRealEstatePics));

export default router;
