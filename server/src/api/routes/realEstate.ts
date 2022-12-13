import asyncHandler from 'express-async-handler';
import { Router, raw } from 'express';

import { realEstateControllers } from '../controllers';
import { postToWebhook, createCheckout, createPortal, checkoutSession } from '../controllers/stripeServer';

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

// STRIPE
router.get('/checkout-session', asyncHandler(checkoutSession));
router.post('/webhook', raw({ type: 'application/json' }), asyncHandler(postToWebhook));
router.post('/create-checkout-session', asyncHandler(createCheckout));
router.post('/create-portal-session', asyncHandler(createPortal));

export default router;
