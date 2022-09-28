import asyncHandler from 'express-async-handler';
import { Router } from 'express';
import express from 'express';

import { getAllRealEstates, getOneRealEstate, postToWebhook } from '../controllers/realEstate';

const router = Router();

// GETs
router.get('/', asyncHandler(getAllRealEstates));
router.get('/:id', asyncHandler(getOneRealEstate));

// STRIPE
router.post('/webhook', express.raw({ type: 'application/json' }), asyncHandler(postToWebhook));

export default router;
