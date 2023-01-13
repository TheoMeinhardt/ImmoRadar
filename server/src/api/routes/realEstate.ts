import asyncHandler from 'express-async-handler';
import { Router, raw } from 'express';

import { authorize } from '../middleware';
import { realEstateControllers } from '../controllers';
import { postToWebhook, createCheckout, createPortal, checkoutSession } from '../controllers/stripeServer';

const router = Router();

// GETs
router.get('/', authorize, asyncHandler(realEstateControllers.getAllRealEstates));
router.get('/short', authorize, asyncHandler(realEstateControllers.getShortendRealEstates));
router.get('/:id', authorize, asyncHandler(realEstateControllers.getOneRealEstate));

// POSTs
router.post('/', authorize, asyncHandler(realEstateControllers.addRealEstate));

// PATCHs
router.patch('/:id', authorize, asyncHandler(realEstateControllers.patchRealEstate));

// DELETEs
router.delete('/:id', authorize, asyncHandler(realEstateControllers.deleteRealEstate));

// STRIPE
router.get('/checkout-session/:session_id', asyncHandler(checkoutSession));
router.post('/webhook', raw({ type: 'application/json' }), asyncHandler(postToWebhook));
router.post('/create-checkout-session', asyncHandler(createCheckout));
router.post('/create-portal-session', asyncHandler(createPortal));
// router.post('/create-customer', asyncHandler(createCustomer));
// router.post('/create-subscription', asyncHandler(createSubscription));

export default router;
