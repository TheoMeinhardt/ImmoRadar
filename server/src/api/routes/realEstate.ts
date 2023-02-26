import asyncHandler from 'express-async-handler';
import { Router, raw } from 'express';

import { authorize } from '../middleware';
import { jwtScope } from '../types';
import { realEstateControllers, commentSystemControllers } from '../controllers';
// import { commentsRouter } from '.';
import { postToWebhook, createCheckout, createPortal, checkoutSession } from '../controllers/stripeServer';

const router = Router();

// router.use(commentsRouter);

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

// COMMENTSYSTEM
router.get('/:id/posts', asyncHandler(commentSystemControllers.getPostsAndComments));
// POSTS
router.post('/:id/posts', asyncHandler(commentSystemControllers.postPost));
router.patch('/:id/posts/:post_id', asyncHandler(commentSystemControllers.patchPost));
router.post('/:id/posts/:post_id', asyncHandler(commentSystemControllers.likePost));
router.delete('/:id/posts/:post_id', asyncHandler(commentSystemControllers.deletePost));
router.delete('/:id/posts/:post_id', asyncHandler(commentSystemControllers.unlikePost));
// COMMENTS
router.post('/:id/posts/:post_id/comments', asyncHandler(commentSystemControllers.postComment));
router.patch('/:id/posts/:post_id/comments/:comment_id', asyncHandler(commentSystemControllers.patchComment));
router.post('/:id/posts/:post_id/comments/:comment_id', asyncHandler(commentSystemControllers.likeComment));
router.delete('/:id/posts/:post_id/comments/:comment_id', asyncHandler(commentSystemControllers.deleteComment));
router.delete('/:id/posts/:post_id/comments/:comment_id', asyncHandler(commentSystemControllers.unlikeComment));

export default router;
