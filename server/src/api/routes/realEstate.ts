import asyncHandler from 'express-async-handler';
import { Router, raw } from 'express';

import { authorize } from '../middleware';
import { jwtScope } from '../types';
import { realEstateControllers } from '../controllers';
import { postToWebhook, createCheckout, checkoutSession } from '../controllers/stripeServer';

const router = Router();

// GETs
router.get('/', authorize(jwtScope.apiguest), asyncHandler(realEstateControllers.getAllRealEstates));
router.get('/short', authorize(jwtScope.apiguest), asyncHandler(realEstateControllers.getShortendRealEstates));
router.get('/:id', authorize(jwtScope.apiguest), asyncHandler(realEstateControllers.getOneRealEstate));

// POSTs
router.post('/', authorize(jwtScope.apiuser), asyncHandler(realEstateControllers.addRealEstate));

// PATCHs
router.patch('/:id', authorize(jwtScope.apiuser), asyncHandler(realEstateControllers.patchRealEstate));

// DELETEs
router.delete('/:id', authorize(jwtScope.apiuser), asyncHandler(realEstateControllers.deleteRealEstate));

// STRIPE
router.get('/checkout-session/:session_id', asyncHandler(checkoutSession));
router.post('/webhook', raw({ type: 'application/json' }), asyncHandler(postToWebhook));
router.post('/create-checkout-session', asyncHandler(createCheckout));
// router.post('/create-portal-session', asyncHandler(createPortal));

export default router;
