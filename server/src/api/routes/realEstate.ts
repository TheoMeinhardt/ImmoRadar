import asyncHandler from 'express-async-handler';
import { Router } from 'express';

import { getAllRealEstates, getOneRealEstate, addRealEstate, deleteRealEstate, patchRealEstate } from '../controllers/realEstate';

const router = Router();

// GETs
router.get('/', asyncHandler(getAllRealEstates));
router.get('/:id', asyncHandler(getOneRealEstate));

// POSTs
router.post('/', asyncHandler(addRealEstate));

// PATCHs
router.patch('/:id', asyncHandler(patchRealEstate));

// DELETEs
router.delete('/:id', asyncHandler(deleteRealEstate));

export default router;
