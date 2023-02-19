/* eslint-disable camelcase */
import { query } from '../../config/dbconfig';

//  -------------- GETS --------------

async function dBgetPostsByRealEstate(re_id) {
  const { rows } = await query(
    'SELECT posts.*, user.user_id ,user.name FROM posts join user on posts.user_id = user.user_id where re_id = $1',
    [re_id],
  );
  return rows;
}

async function dBgetCommentsByPost(post_id) {
  const { rows } = await query(
    'SELECT comments.*, user.user_id, user.name FROM comments join user on comments.user_id = user.user_id where post_id = $1',
    [post_id],
  );
  return rows;
}

async function dBgetLikesFromPost(post_id) {
  const { rows } = await query('SELECT COUNT(*) FROM likes WHERE post_id = $1', [post_id]);
  return rows;
}

async function dBgetLikesFromComments(comment_id) {
  const { rows } = await query('SELECT COUNT(*) FROM likes WHERE comment_id = $1', [comment_id]);
  return rows;
}

//  -------------- POSTS --------------

async function dBpostPosts(title, content, user_id, re_id) {
  const { rows } = await query(
    'INSERT INTO posts (title, content, user_id, re_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, content, user_id, re_id],
  );
  return rows;
}

async function dBpostComment(content, user_id, post_id) {
  const { rows } = await query(
    'INSERT INTO comments (title, content, user_id, post_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [content, user_id, post_id],
  );
  return rows;
}

//  -------------- Patches/UPDATES --------------

async function dBPatchPost(title, content, post_id) {
  const { rows } = await query(
    'update posts set title = $1, content = $2 where post_id = $3 RETURNING *',
    [title, content, post_id],
  );
  return rows;
}

async function dBPatchComment(content, comment_id) {
  const { rows } = await query(
    'update comments set content = $1 where comment_id = $2 RETURNING *',
    [content, comment_id],
  );
  return rows;
}

//  -------------- DELETES --------------

async function dBdeletePost(post_id) {
  const { rows } = await query('delete from posts where post_id = $1', [post_id]);
  return rows;
}

async function dBDeleteComment(comment_id) {
  const { rows } = await query('delete from comments where comment_id = $1', [comment_id]);
  return rows;
}

export {
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
};
