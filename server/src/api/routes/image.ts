import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import { uploadRealEstatePics, uploadUserProfilePic } from '../helpers';
import { imageControllers } from '../controllers';

const router = Router();

// POSTs
// router.post('/', upload.fields(fields), asyncHandler(imageControllers.postImage));
router.post('/user/:id', uploadUserProfilePic.single('profilePic'));
router.post('/realestate/:id', uploadRealEstatePics.array('realEstatePics', 25), asyncHandler(imageControllers.postRealEstatePics));

export default router;
