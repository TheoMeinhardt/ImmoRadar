import { query } from '../../config/dbconfig';

//  -------------- GETS --------------

async function getPostsByRealEstate(id) {
  const { rows } = await query(
    'SELECT posts.*, user.name FROM posts join user on posts.user_id = user.user_id where re_id = $1',
    [id],
  );
  return rows;
}

async function getCommentsByPost(id) {
  const { rows } = await query(
    'SELECT comments.*, user.name FROM comments join user on comments.user_id = user.user_id where post_id = $1',
    [id],
  );
  return rows;
}

async function getLikesFromPost(id) {
  const { rows } = await query('SELECT COUNT(*) FROM likes WHERE post_id = $1', [id]);
  return rows;
}

async function getLikesFromComments(id) {
  const { rows } = await query('SELECT COUNT(*) FROM likes WHERE comment_id = $1', [id]);
  return rows;
}

//  -------------- POSTS --------------

async function postPosts(title, content, user_id, re_id) {
  const { rows } = await query(
    'INSERT INTO posts (title, content, user_id, re_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, content, user_id, re_id],
  );
  return rows;
}

async function postComment(content, user_id, post_id) {
  const { rows } = await query(
    'INSERT INTO comments (title, content, user_id, post_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [content, user_id, post_id],
  );
  return rows;
}

export {
  getPostsByRealEstate,
  getCommentsByPost,
  getLikesFromPost,
  getLikesFromComments,
  postPosts,
  postComment,
};
