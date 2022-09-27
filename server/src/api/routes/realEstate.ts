import asyncHandler from 'express-async-handler';
import { Router } from 'express';

import { getAllRealEstates, getOneRealEstate } from '../controllers/realEstate';

const router = Router();

// GETs
router.get('/', asyncHandler(getAllRealEstates));
router.get('/:id', asyncHandler(getOneRealEstate));

export default router;
