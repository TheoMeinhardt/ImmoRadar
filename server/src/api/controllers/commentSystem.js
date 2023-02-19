import {
  dBgetPostsByRealEstate,
  dBgetCommentsByPost,
  dBgetLikesFromPost,
  dBgetLikesFromComments,
  dBpostPosts,
  dBpostComment,
  dBPatchPost,
  dBPatchComment,
  dBdeletePost,
  dBDeleteComment,
} from '../controllers/commentSystem.js';

async function getPostsAndComments(re_id) {
  const posts = await dBgetPostsByRealEstate(re_id);

  const postCommentResult = {};

  for (let post of posts) {
    const comments = await dBgetCommentsByPost(post.post_id);
    if (!postCommentResult[post.post_id]) {
      postCommentResult[post.post_id] = { ...post, comments: [] };
    }
    postCommentResult[post.post_id].comments.push(...comments);
  }

  return Object.values(postCommentResult);
}
