import asyncHandler from 'express-async-handler';
import { Router, raw } from 'express';

import { authorize } from '../middleware';
import { jwtScope } from '../types';
import { realEstateControllers } from '../controllers';
import { commentsRouter } from '.';
import { postToWebhook, createCheckout, createPortal, checkoutSession } from '../controllers/stripeServer';

// import {
//   getPostsAndComments,
//   postPost,
//   postComment,
//   patchPost,
//   patchComment,
//   likePost,
//   unlikePost,
//   likeComment,
//   unlikeComment,
//   deletePost,
//   deleteComment,
// } from '../controllers/commentSystem.js';

const router = Router();

router.use(commentsRouter);

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
router.post('/create-portal-session', asyncHandler(createPortal));
// router.post('/create-customer', asyncHandler(createCustomer));
// router.post('/create-subscription', asyncHandler(createSubscription));

// ----------------------------------------------------------------

// COMMENTSYSTEM
// router.get('/:id/posts', asyncHandler(getPostsAndComments));
// // POSTS
// router.post('/:id/posts', asyncHandler(postPost));
// router.patch('/:id/posts/:post_id', asyncHandler(patchPost));
// router.post('/:id/posts/:post_id', asyncHandler(likePost));
// router.delete('/:id/posts/:post_id', asyncHandler(deletePost));
// router.delete('/:id/posts/:post_id', asyncHandler(unlikePost));
// // COMMENTS
// router.post('/:id/posts/:post_id/comments', asyncHandler(postComment));
// router.patch('/:id/posts/:post_id/comments/:comment_id', asyncHandler(patchComment));
// router.post('/:id/posts/:post_id/comments/:comment_id', asyncHandler(likeComment));
// router.delete('/:id/posts/:post_id/comments/:comment_id', asyncHandler(deleteComment));
// router.delete('/:id/posts/:post_id/comments/:comment_id', asyncHandler(unlikeComment));

export default router;
