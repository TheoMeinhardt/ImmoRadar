import asyncHandler from 'express-async-handler';
import { Router } from 'express';

import { getAllRealEstates } from '../controllers/realEstate';

const router = Router();

// GETs
router.get('/', asyncHandler(getAllRealEstates));

export default router;
