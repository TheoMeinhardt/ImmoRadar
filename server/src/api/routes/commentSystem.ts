import asyncHandler from 'express-async-handler';
import { Router } from 'express';
import { getPostsAndComments, postPost, postComment, patchPost, patchComment, likePost, unlikePost, likeComment, unlikeComment, deletePost, deleteComment } from '../controllers/commentSystem.js';

const router = Router();

// COMMENTSYSTEM
router.get('/:id/posts', asyncHandler(getPostsAndComments));
// POSTS
router.post('/:id/posts', asyncHandler(postPost));
router.patch('/:id/posts/:post_id', asyncHandler(patchPost));
router.post('/:id/posts/:post_id', asyncHandler(likePost));
router.delete('/:id/posts/:post_id', asyncHandler(deletePost));
router.delete('/:id/posts/:post_id', asyncHandler(unlikePost));
// COMMENTS
router.post('/:id/posts/:post_id/comments', asyncHandler(postComment));
router.patch('/:id/posts/:post_id/comments/:comment_id', asyncHandler(patchComment));
router.post('/:id/posts/:post_id/comments/:comment_id', asyncHandler(likeComment));
router.delete('/:id/posts/:post_id/comments/:comment_id', asyncHandler(deleteComment));
router.delete('/:id/posts/:post_id/comments/:comment_id', asyncHandler(unlikeComment));

export default router;
