import asyncHandler from 'express-async-handler';
import { Router, raw } from 'express';

import { realEstateControllers } from '../controllers';
import { postToWebhook, createCustomer, createCheckout, createPortal, createSubscription } from '../controllers/stripeServer';

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
router.post('/webhook', raw({ type: 'application/json' }), asyncHandler(postToWebhook));
router.post('/create-checkout-session', asyncHandler(createCheckout));
router.post('/create-portal-session', asyncHandler(createPortal));
router.post('/create-customer', asyncHandler(createCustomer));
router.post('/create-subscription', asyncHandler(createSubscription));

export default router;
