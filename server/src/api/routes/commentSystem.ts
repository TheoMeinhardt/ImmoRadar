import asyncHandler from 'express-async-handler';
import { Router } from 'express';
import { commentSystemControllers } from '../controllers';

const router = Router();

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
