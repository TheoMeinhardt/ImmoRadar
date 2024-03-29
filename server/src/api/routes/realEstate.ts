import asyncHandler from 'express-async-handler';
import { Router, raw } from 'express';

import { authorize } from '../middleware';
import { jwtScope } from '../types';
import { realEstateControllers, commentSystemControllers } from '../controllers';
// import { commentsRouter } from '.';
import { postToWebhook, createCheckout, createPortal } from '../controllers/stripeServer';

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
// router.get('/checkout-session/:session_id', asyncHandler(checkoutSession));
router.post('/webhook', raw({ type: 'application/json' }), asyncHandler(postToWebhook));
router.post('/create-checkout-session', asyncHandler(createCheckout));
router.post('/create-portal-session', asyncHandler(createPortal));

// COMMENTSYSTEM
router.get('/:id/posts', asyncHandler(commentSystemControllers.getPostsAndComments));

router.get('/:id/posts/:user_id/:post_id', asyncHandler(commentSystemControllers.checkLikeOnPost));
router.get('/:id/posts/:user_id/:comment_id', asyncHandler(commentSystemControllers.checkLikeOnComment));

// POSTS
router.post('/:id/posts', asyncHandler(commentSystemControllers.postPost));
router.patch('/posts/:post_id', asyncHandler(commentSystemControllers.patchPost));
router.delete('/posts/:post_id', asyncHandler(commentSystemControllers.deletePost));

router.post('/posts/:post_id/like', asyncHandler(commentSystemControllers.likePost));
router.delete('/posts/:post_id/unlike', asyncHandler(commentSystemControllers.unlikePost));

// COMMENTS
router.post('/posts/:post_id/comments', asyncHandler(commentSystemControllers.postComment));
router.patch('/posts/comments/:comment_id', asyncHandler(commentSystemControllers.patchComment));
router.delete('/posts/comments/:comment_id', asyncHandler(commentSystemControllers.deleteComment));

router.post('/posts/comments/:comment_id/like', asyncHandler(commentSystemControllers.likeComment));
router.delete('/posts/comments/:comment_id/unlike', asyncHandler(commentSystemControllers.unlikeComment));

export default router;
