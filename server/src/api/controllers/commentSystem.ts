/* eslint-disable camelcase */
/* eslint-disable no-await-in-loop */
import { Request, Response } from 'express';
import {
  dbCheckLikeExistsOnPost,
  dbCheckLikeExistsOnComment,
  dbGetPostsByRealEstate,
  dbGetPostByPostID,
  dbGetCommentsByPost,
  dbGetCommentByCommentID,
  dbGetLikesFromPost,
  dbGetLikesFromComments,
  dbPostPost,
  dbLikePost,
  dbPostComment,
  dbLikeComment,
  dbPatchPost,
  dbPatchComment,
  dbDeletePost,
  dbUnlikePost,
  dbDeleteComment,
  dbUnlikeComment,
} from '../models/commentSystem';

//  -------------- GETS --------------

async function getPostsAndComments(req: Request, res: Response): Promise<void> {
  const { id: re_id } = req.params;
  const posts = await dbGetPostsByRealEstate(re_id);

  res.status(200).json(posts);
}

async function checkLikeOnPost(req: Request, res: Response): Promise<void> {
  try {
    const { post_id: postID, user_id: userID } = req.params;
    const exists = await dbCheckLikeExistsOnPost(userID, postID);
    res.status(200).json({ exists });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}
async function checkLikeOnComment(req: Request, res: Response): Promise<void> {
  try {
    const { comment_id: commentID, user_id: userID } = req.params;
    const exists = await dbCheckLikeExistsOnComment(userID, commentID);
    res.status(200).send({ exists });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

//  -------------- POSTS --------------

async function postPost(req: Request, res: Response): Promise<void> {
  try {
    const { id: re_id } = req.params;
    const { title, content, user_id } = req.body;
    if (re_id == null || title == null || content == null || user_id == null) {
      res.status(500).send('Too few arguments');
      return;
    }
    const result = await dbPostPost(title, content, user_id, re_id);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function postComment(req: Request, res: Response): Promise<void> {
  try {
    const { post_id } = req.params;
    const { content, user_id } = req.body;

    // Check if post exists
    const postExists = await dbGetPostByPostID(post_id);
    if (!postExists) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    const result = await dbPostComment(content, user_id, post_id);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function likePost(req: Request, res: Response): Promise<void> {
  try {
    const { post_id } = req.params;
    const { user_id } = req.body;

    const postExists = await dbGetPostByPostID(post_id);
    if (!postExists) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    const likeExists = await dbCheckLikeExistsOnPost(user_id, post_id);
    if (likeExists) {
      res.status(200).json({ error: 'Like already exists' });
      return;
    }

    const result = await dbLikePost(user_id, post_id);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function likeComment(req: Request, res: Response): Promise<void> {
  try {
    const { comment_id } = req.params;
    const { user_id } = req.body;

    // Check if comment exists
    const commentExists = await dbGetCommentByCommentID(comment_id);
    if (!commentExists) {
      res.status(404).json({ error: 'Comment not found' });
      return;
    }

    // Check if like already exists
    const likeExists = await dbCheckLikeExistsOnComment(user_id, comment_id);
    if (likeExists) {
      res.status(200).json({ error: 'Like already exists' });
      return;
    }

    const result = await dbLikeComment(user_id, comment_id);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

//  -------------- PATCHES/UPDATES --------------

async function patchPost(req: Request, res: Response): Promise<void> {
  const { title, content, user_id } = req.body;
  const { post_id } = req.params;

  const postById = await dbGetPostByPostID(post_id);

  if (!postById) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }

  if (postById.userID !== user_id) {
    res.status(401).json({ message: 'Not authorized to edit this post' });
    return;
  }

  const updatedPost = await dbPatchPost(title, content, post_id);

  res.status(200).json(updatedPost);
}

async function patchComment(req: Request, res: Response): Promise<void> {
  try {
    const { content, user_id } = req.body;
    const { comment_id } = req.params;

    const comment = await dbGetCommentByCommentID(comment_id);

    if (!comment) {
      res.status(404).json({ message: 'Comment not found' });
      return;
    }

    if (comment.userID !== user_id) {
      res.status(401).json({ message: 'Not authorized to edit this comment' });
      return;
    }

    const updatedComment = await dbPatchComment(content, comment_id);
    res.status(200).json(updatedComment);
  } catch (error) {
    console.error(error);
  }
}

//  -------------- DELETES --------------

async function unlikePost(req: Request, res: Response): Promise<void> {
  try {
    const { post_id } = req.params;
    const { user_id } = req.body;

    // Check if post exists
    const postExists = await dbGetPostByPostID(post_id);
    if (!postExists) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    // Check if like exists
    const likeExists = await dbCheckLikeExistsOnPost(user_id, post_id);
    if (!likeExists) {
      res.status(200).json({ error: 'Like does not exist' });
      return;
    }

    const deletedLike = await dbUnlikePost(user_id, post_id);
    res.status(200).json(deletedLike);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function unlikeComment(req: Request, res: Response): Promise<void> {
  try {
    const { user_id } = req.body;
    const { comment_id } = req.params;

    // Check if comment exists
    const commentExists = await dbGetCommentByCommentID(comment_id);
    if (!commentExists) {
      res.status(404).json({ error: 'Comment not found' });
      return;
    }

    // Check if like exists
    const likeExists = await dbCheckLikeExistsOnComment(user_id, comment_id);
    if (!likeExists) {
      res.status(400).json({ error: 'Like does not exist' });
      return;
    }

    const result = await dbUnlikeComment(user_id, comment_id);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function deletePost(req: Request, res: Response): Promise<void> {
  const { post_id } = req.params;
  const { user_id } = req.body;
  const postByID = await dbGetPostByPostID(post_id);
  if (!postByID) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }
  if (postByID.userID !== user_id) {
    res.status(403).json({ message: 'You are not authorized to delete this post' });
    return;
  }
  await dbDeletePost(post_id);
  res.status(200).json({ message: 'Post deleted successfully' });
}

async function deleteComment(req: Request, res: Response): Promise<void> {
  const { comment_id } = req.params;
  const { user_id } = req.body;
  const comment = await dbGetCommentByCommentID(comment_id);
  if (!comment) {
    res.status(404).json({ message: 'Comment not found' });
    return;
  }
  if (comment.userID !== user_id) {
    res.status(403).json({ message: 'You are not authorized to delete this comment' });
    return;
  }
  await dbDeleteComment(comment_id);
  res.status(200).json({ message: 'Comment deleted successfully' });
}

export { checkLikeOnPost, checkLikeOnComment, getPostsAndComments, postPost, postComment, patchPost, patchComment, likePost, unlikePost, likeComment, unlikeComment, deletePost, deleteComment };
