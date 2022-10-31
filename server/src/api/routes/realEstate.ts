import asyncHandler from 'express-async-handler';
import { Router } from 'express';

import { realEstateControllers } from '../controllers';

const router = Router();

// GETs
router.get('/', asyncHandler(realEstateControllers.getAllRealEstates));
router.get('/short', asyncHandler(realEstateControllers.getShortendRealEstates));
router.get('/:id', asyncHandler(realEstateControllers.getOneRealEstate));

// POSTs
router.post('/', asyncHandler(realEstateControllers.addRealEstate));

// PATCHs
router.patch('/:id', asyncHandler(realEstateControllers.patchRealEstate));

// DELETEs
router.delete('/:id', asyncHandler(realEstateControllers.deleteRealEstate));

export default router;
