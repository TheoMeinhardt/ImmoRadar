/* eslint-disable camelcase */
import { query } from '../../config/dbconfig';

//  -------------- GETS --------------

async function dbCheckLikeExistsOnPost(user_id, post_id) {
  const { rows } = await query('SELECT * FROM likes WHERE user_id = $1 AND post_id = $2', [
    user_id,
    post_id,
  ]);
  return rows.length > 0;
}

async function dbCheckLikeExistsOnComment(user_id, comment_id) {
  const { rows } = await query('SELECT * FROM likes WHERE user_id = $1 AND comment_id = $2', [
    user_id,
    comment_id,
  ]);
  return rows.length > 0;
}

async function dbGetPostsByRealEstate(re_id) {
  const { rows } = await query(
    'SELECT posts.*, user.user_id ,user.name FROM posts join user on posts.user_id = user.user_id where re_id = $1',
    [re_id],
  );
  return rows;
}

async function dbGetPostByPostID(post_id) {
  const { rows } = await query(
    'SELECT posts.*, user.user_id, user.name FROM posts JOIN user ON posts.user_id = user.user_id WHERE post_id = $1',
    [post_id],
  );
  return rows[0];
}

async function dbGetCommentsByPost(post_id) {
  const { rows } = await query(
    'SELECT comments.*, user.user_id, user.name FROM comments join user on comments.user_id = user.user_id where post_id = $1',
    [post_id],
  );
  return rows;
}

async function dbGetCommentByCommentID(comment_id) {
  const { rows } = await query(
    'SELECT comments.*, user.user_id, user.name FROM comments JOIN user ON comments.user_id = user.user_id WHERE comment_id = $1',
    [comment_id],
  );
  return rows[0];
}

async function dbGetLikesFromPost(post_id) {
  const { rows } = await query('SELECT COUNT(*) FROM likes WHERE post_id = $1', [post_id]);
  return rows;
}

async function dbGetLikesFromComments(comment_id) {
  const { rows } = await query('SELECT COUNT(*) FROM likes WHERE comment_id = $1', [comment_id]);
  return rows;
}

//  -------------- POSTS --------------

async function dbPostPost(title, content, user_id, re_id) {
  const { rows } = await query(
    'INSERT INTO posts (title, content, user_id, re_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, content, user_id, re_id],
  );
  return rows;
}

async function dbLikePost(user_id, post_id) {
  const { rows } = await query('INSERT INTO likes (user_id, post_id) VALUES ($1, $2) RETURNING *', [
    user_id,
    post_id,
  ]);
  return rows;
}

async function dbPostComment(content, user_id, post_id) {
  const { rows } = await query(
    'INSERT INTO comments (title, content, user_id, post_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [content, user_id, post_id],
  );
  return rows;
}

async function dbLikeComment(user_id, comment_id) {
  const { rows } = await query(
    'INSERT INTO likes (user_id, comment_id) VALUES ($1, $2) RETURNING *',
    [user_id, comment_id],
  );
  return rows;
}

//  -------------- PATCHES/UPDATES --------------

async function dbPatchPost(title, content, post_id) {
  const { rows } = await query(
    'update posts set title = $1, content = $2 where post_id = $3 RETURNING *',
    [title, content, post_id],
  );
  return rows;
}

async function dbPatchComment(content, comment_id) {
  const { rows } = await query(
    'update comments set content = $1 where comment_id = $2 RETURNING *',
    [content, comment_id],
  );
  return rows;
}

//  -------------- DELETES --------------

async function dbDeletePost(post_id) {
  const { rows } = await query('delete from posts where post_id = $1', [post_id]);
  return rows;
}

async function dbUnlikePost(post_id, user_id) {
  const { rows } = await query(
    'DELETE FROM likes WHERE post_id = $1 AND user_id = $2 RETURNING *',
    [post_id, user_id],
  );
  return rows;
}

async function dbDeleteComment(comment_id) {
  const { rows } = await query('delete from comments where comment_id = $1', [comment_id]);
  return rows;
}

async function dbUnlikeComment(comment_id, user_id) {
  const { rows } = await query(
    'DELETE FROM likes WHERE comment_id = $1 AND user_id = $2 RETURNING *',
    [comment_id, user_id],
  );
  return rows;
}

export {
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
};
