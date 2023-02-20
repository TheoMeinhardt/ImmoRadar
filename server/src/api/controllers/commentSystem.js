/* eslint-disable camelcase */
/* eslint-disable no-await-in-loop */
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
} from '../models/commentSystem.js';

//  -------------- GETS --------------

async function getPostsAndComments(req, res) {
  const { re_id } = req.params;
  const posts = await dbGetPostsByRealEstate(re_id);

  const postCommentResult = {};

  for (let i = 0; i < posts.length; i += 1) {
    const post = posts[i];
    const comments = await dbGetCommentsByPost(post.post_id);
    const likesForPost = await dbGetLikesFromPost(post.post_id);
    if (!postCommentResult[post.post_id]) {
      postCommentResult[post.post_id] = { ...post, comments: [] };
    }
    postCommentResult[post.post_id].likes = likesForPost[0].count;
    for (let j = 0; j < comments.length; j += 1) {
      const comment = comments[j];
      const likesForComment = await dbGetLikesFromComments(comment.comment_id);
      if (
        !postCommentResult[post.post_id].comments.find((c) => c.comment_id === comment.comment_id)
      ) {
        postCommentResult[post.post_id].comments.push({
          ...comment,
          likes: likesForComment[0].count,
        });
      } else {
        const commentIndex = postCommentResult[post.post_id].comments.findIndex(
          (c) => c.comment_id === comment.comment_id,
        );
        postCommentResult[post.post_id].comments[commentIndex].likes = likesForComment[0].count;
      }
    }
  }

  res.status(200).json(Object.values(postCommentResult));
}

//  -------------- POSTS --------------

async function postPost(req, res) {
  try {
    const { title, content, user_id, re_id } = req.body;

    const result = await dbPostPost(title, content, user_id, re_id);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function postComment(req, res) {
  try {
    const { content, user_id, post_id } = req.body;

    const result = await dbPostComment(content, user_id, post_id);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function likePost(req, res) {
  try {
    const { user_id, post_id } = req.body;

    // Check if post exists
    const postExists = await dbGetPostByPostID(post_id);
    if (!postExists) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if like already exists
    const likeExists = await dbCheckLikeExistsOnPost(user_id, post_id);
    if (likeExists) {
      return res.status(400).json({ error: 'Like already exists' });
    }

    const result = await dbLikePost(user_id, post_id);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function likeComment(req, res) {
  try {
    const { user_id, comment_id } = req.body;

    // Check if comment exists
    const commentExists = await dbGetCommentByCommentID(comment_id);
    if (!commentExists) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Check if like already exists
    const likeExists = await dbCheckLikeExistsOnComment(user_id, comment_id);
    if (likeExists) {
      return res.status(400).json({ error: 'Like already exists' });
    }

    const result = await dbLikeComment(user_id, comment_id);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

//  -------------- PATCHES/UPDATES --------------

async function patchPost(req, res) {
  const { title, content, user_id } = req.body;
  const { post_id } = req.params;

  const post = await dbGetPostByPostID(post_id);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  if (post.user_id !== user_id) {
    return res.status(401).json({ message: 'Not authorized to edit this post' });
  }

  const updatedPost = await dbPatchPost(title, content, post_id);

  return res.status(200).json(updatedPost);
}

async function dBPatchComment(req, res) {
  const { content, user_id } = req.body;
  const { comment_id } = req.params;

  const comment = await dbGetCommentByCommentID(comment_id);

  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }

  if (comment.user_id !== user_id) {
    return res.status(401).json({ message: 'Not authorized to edit this comment' });
  }

  const updatedComment = await dbPatchComment(content, comment_id);

  return res.status(200).json(updatedComment);
}

//  -------------- DELETES --------------

async function unlikePost(req, res) {
  try {
    const { user_id, post_id } = req.body;

    // Check if post exists
    const postExists = await dbGetPostByPostID(post_id);
    if (!postExists) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if like exists
    const likeExists = await dbCheckLikeExistsOnPost(user_id, post_id);
    if (!likeExists) {
      return res.status(400).json({ error: 'Like does not exist' });
    }

    const result = await dbUnlikePost(user_id, post_id);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function unlikeComment(req, res) {
  try {
    const { user_id, comment_id } = req.body;

    // Check if comment exists
    const commentExists = await dbGetCommentByCommentID(comment_id);
    if (!commentExists) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Check if like exists
    const likeExists = await dbCheckLikeExistsOnComment(user_id, comment_id);
    if (!likeExists) {
      return res.status(400).json({ error: 'Like does not exist' });
    }

    const result = await dbUnlikeComment(user_id, comment_id);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

export {
  getPostsAndComments,
  postPost,
  postComment,
  patchPost,
  dBPatchComment,
  likePost,
  unlikePost,
  likeComment,
  unlikeComment,
};
