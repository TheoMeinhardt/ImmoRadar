import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { authorize } from '../middleware';
import { jwtScope } from '../types';
import { assetControllers } from '../controllers';

const router = Router();

router.get('/', authorize(jwtScope.apiguest), asyncHandler(assetControllers.getAssets));

export default router;
