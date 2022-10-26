import asyncHandler from 'express-async-handler';
import { Router } from 'express';

import { getAllRealEstates, getOneRealEstate, addRealEstate } from '../controllers/realEstate';

const router = Router();

// GETs
router.get('/', asyncHandler(getAllRealEstates));
router.get('/:id', asyncHandler(getOneRealEstate));

// POSTs
router.post('/', asyncHandler(addRealEstate));

export default router;
