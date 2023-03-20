/* eslint-disable camelcase */
import pool from '../../config/dbconfig';
import { post, comment, like } from '../types';
import { commentMapper, postMapper, likeMapper } from '../helpers';

//  -------------- GETS --------------

async function dbCheckLikeExistsOnPost(userID: string, postID: string) {
  const { rows } = await pool.query('SELECT * FROM likes WHERE user_id = $1 AND post_id = $2', [userID, postID]);
  return rows.length > 0;
}

async function dbCheckLikeExistsOnComment(userID: string, commentID: string) {
  const { rows } = await pool.query('SELECT * FROM likes WHERE user_id = $1 AND comment_id = $2', [userID, commentID]);
  return rows.length > 0;
}

async function dbGetPostsByRealEstate(re_id: string): Promise<post[]> {
  const { rows } = await pool.query(
    'SELECT posts.post_id, posts.title, posts.content, posts.created_at, posts.re_id, posts.user_id, users.user_id ,users.name FROM posts join users on posts.user_id = users.user_id where re_id = $1',
    [re_id],
  );
  // console.log(rows);
  return (await postMapper(rows)) as post[];
}

async function dbGetPostByPostID(postID: string): Promise<post> {
  const { rows } = await pool.query(
    'SELECT posts.post_id,posts.title,posts.content,posts.created_at,posts.re_id,posts.user_id, users.user_id, users.name FROM posts JOIN users ON posts.user_id = users.user_id WHERE post_id = $1',
    [postID],
  );
  return (await postMapper(rows[0])) as post;
}

async function dbGetCommentsByPost(postID: string): Promise<comment[]> {
  const { rows } = await pool.query(
    'SELECT comments.comment_id,comments.content,comments.created_at,comments.user_id,comments.post_id, users.user_id, users.name FROM comments join users on comments.user_id = users.user_id where post_id = $1',
    [postID],
  );
  return (await commentMapper(rows)) as comment[];
}

async function dbGetCommentByCommentID(commentID: string): Promise<comment> {
  const { rows } = await pool.query(
    'SELECT comments.comment_id,comments.content,comments.created_at,comments.user_id,comments.post_id, users.user_id, users.name FROM comments join users on comments.user_id = users.user_id where comment_id = $1',
    [commentID],
  );
  return (await commentMapper(rows[0])) as comment;
}

async function dbGetLikesFromPost(postID: string): Promise<number> {
  const { rows } = await pool.query('SELECT COUNT(*) FROM likes WHERE post_id = $1', [postID]);
  return rows[0];
}

async function dbGetLikesFromComments(commentID: string): Promise<number> {
  const { rows } = await pool.query('SELECT COUNT(*) FROM likes WHERE comment_id = $1', [commentID]);
  return rows[0];
}

//  -------------- POSTS --------------

async function dbPostPost(title: string, content: string, userID: string, re_id: string): Promise<post> {
  const { rows } = await pool.query('INSERT INTO posts (title, content, user_id, re_id) VALUES ($1, $2, $3, $4) RETURNING *', [title, content, userID, re_id]);
  return (await postMapper(rows[0])) as post;
}

async function dbLikePost(userID: string, postID: string): Promise<like> {
  const { rows } = await pool.query('INSERT INTO likes (user_id, post_id) VALUES ($1, $2) RETURNING *', [userID, postID]);
  return likeMapper(rows[0]) as like;
}

async function dbPostComment(content: string, userID: string, postID: string): Promise<comment> {
  const { rows } = await pool.query('INSERT INTO comments (content, user_id, post_id) VALUES ($1, $2, $3) RETURNING *', [content, userID, postID]);
  return (await commentMapper(rows[0])) as comment;
}

async function dbLikeComment(userID: string, commentID: string): Promise<like> {
  const { rows } = await pool.query('INSERT INTO likes (user_id, comment_id) VALUES ($1, $2) RETURNING *', [userID, commentID]);
  return likeMapper(rows[0]) as like;
}

//  -------------- PATCHES/UPDATES --------------

async function dbPatchPost(title: string, content: string, postID: string): Promise<post> {
  const { rows } = await pool.query('update posts set title = $1, content = $2 where post_id = $3 RETURNING *', [title, content, postID]);
  return (await postMapper(rows[0])) as post;
}

async function dbPatchComment(content: string, commentID: string): Promise<comment> {
  const { rows } = await pool.query('update comments set content = $1 where comment_id = $2 RETURNING *', [content, commentID]);
  return (await commentMapper(rows[0])) as comment;
}

//  -------------- DELETES --------------

async function dbDeletePost(postID: string) {
  await pool.query('delete from posts where post_id = $1', [postID]);
}

async function dbUnlikePost(post_id: string, user_id: string) {
  const { rows } = await pool.query('delete from likes where user_id = $1 and post_id = $2 returning *', [post_id, user_id]);
  return rows[0];
}

async function dbDeleteComment(commentID: string) {
  await pool.query('delete from comments where comment_id = $1', [commentID]);
}

async function dbUnlikeComment(commentID: string, userID: string) {
  const { rows } = await pool.query('DELETE FROM likes WHERE user_id = $1 and comment_id = $2 returning *', [commentID, userID]);
  return rows[0];
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
