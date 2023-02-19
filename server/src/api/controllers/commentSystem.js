/* eslint-disable camelcase */
/* eslint-disable no-await-in-loop */
import {
  dBgetPostsByRealEstate,
  dBgetPostByPostID,
  dBgetCommentsByPost,
  dBgetCommentByCommentID,
  dBgetLikesFromPost,
  dBgetLikesFromComments,
  dBpostPosts,
  dBpostComment,
  dBpatchPost,
  dBpatchComment,
  dBdeletePost,
  dBdeleteComment,
} from '../models/commentSystem.js';

async function getPostsAndComments(req, res) {
  const { re_id } = req.params;
  const posts = await dBgetPostsByRealEstate(re_id);

  const postCommentResult = {};

  for (let i = 0; i < posts.length; i += 1) {
    const post = posts[i];
    const comments = await dBgetCommentsByPost(post.post_id);
    const likesForPost = await dBgetLikesFromPost(post.post_id);
    if (!postCommentResult[post.post_id]) {
      postCommentResult[post.post_id] = { ...post, comments: [] };
    }
    postCommentResult[post.post_id].likes = likesForPost[0].count;
    for (let j = 0; j < comments.length; j += 1) {
      const comment = comments[j];
      const likesForComment = await dBgetLikesFromComments(comment.comment_id);
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

async function postPost(req, res) {
  try {
    const { title, content, user_id, re_id } = req.body;

    const result = await dBpostPosts(title, content, user_id, re_id);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function postComment(req, res) {
  try {
    const { content, user_id, post_id } = req.body;

    const result = await dBpostComment(content, user_id, post_id);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function patchPost(req, res) {
  const { title, content, user_id } = req.body;
  const { post_id } = req.params;

  const post = await dBgetPostByPostID(post_id);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  if (post.user_id !== user_id) {
    return res.status(401).json({ message: 'Not authorized to edit this post' });
  }

  const updatedPost = await dBpatchPost(title, content, post_id);

  return res.status(200).json(updatedPost);
}

async function dBPatchComment(req, res) {
  const { content, user_id } = req.body;
  const { comment_id } = req.params;

  const comment = await dBgetCommentByCommentID(comment_id);

  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }

  if (comment.user_id !== user_id) {
    return res.status(401).json({ message: 'Not authorized to edit this comment' });
  }

  const updatedComment = await dBpatchComment(content, comment_id);

  return res.status(200).json(updatedComment);
}

export { getPostsAndComments, postPost, postComment, patchPost, dBPatchComment };
