import asyncHandler from 'express-async-handler';
import { Router, raw } from 'express';

import { getAllRealEstates, getOneRealEstate } from '../controllers/realEstate';
import {
  postToWebhook,
  // createCustomer,
  createCheckout,
  createPortal,
  // createSubscription,
  config,
  checkoutSession,
} from '../controllers/stripeServer';

const router = Router();

// GETs
router.get('/', asyncHandler(getAllRealEstates));
router.get('/:id', asyncHandler(getOneRealEstate));

// STRIPE
router.get('/config', asyncHandler(config));
router.get('/checkout-session', asyncHandler(checkoutSession));

router.post('/webhook', raw({ type: 'application/json' }), asyncHandler(postToWebhook));
router.post('/create-checkout-session', asyncHandler(createCheckout));
router.post('/create-portal-session', asyncHandler(createPortal));
// router.post('/create-customer', asyncHandler(createCustomer));
// router.post('/create-subscription', asyncHandler(createSubscription));

export default router;
