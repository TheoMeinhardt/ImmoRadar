/* eslint-disable camelcase */
import pool from '../../config/dbconfig';
import { post, comment, like } from '../types';
import { commentMapper, postMapper, likeMapper } from '../helpers';

//  -------------- GETS --------------

async function dbCheckLikeExistsOnPost(userID: string, postID: string) {
  const { rows } = await pool.query('SELECT * FROM likes WHERE userID = $1 AND postID = $2', [userID, postID]);
  return rows.length > 0;
}

async function dbCheckLikeExistsOnComment(userID: string, commentID: string) {
  const { rows } = await pool.query('SELECT * FROM likes WHERE userID = $1 AND commentID = $2', [userID, commentID]);
  return rows.length > 0;
}

async function dbGetPostsByRealEstate(re_id: string): Promise<post[]> {
  const { rows } = await pool.query('SELECT posts.*, user.userID ,user.name FROM posts join user on posts.userID = user.userID where re_id = $1', [re_id]);
  return (await postMapper(rows)) as post[];
}

async function dbGetPostByPostID(postID: string): Promise<post> {
  const { rows } = await pool.query('SELECT posts.*, user.userID, user.name FROM posts JOIN user ON posts.userID = user.userID WHERE postID = $1', [postID]);
  return (await postMapper(rows[0])) as post;
}

async function dbGetCommentsByPost(postID: string): Promise<comment[]> {
  const { rows } = await pool.query('SELECT comments.*, user.userID, user.name FROM comments join user on comments.userID = user.userID where postID = $1', [postID]);
  return (await commentMapper(rows)) as comment[];
}

async function dbGetCommentByCommentID(commentID: string): Promise<comment> {
  const { rows } = await pool.query('SELECT comments.*, user.userID, user.name FROM comments JOIN user ON comments.userID = user.userID WHERE commentID = $1', [commentID]);
  return (await commentMapper(rows[0])) as comment;
}

async function dbGetLikesFromPost(postID: string): Promise<number> {
  const { rows } = await pool.query('SELECT COUNT(*) FROM likes WHERE postID = $1', [postID]);
  return rows[0];
}

async function dbGetLikesFromComments(commentID: string): Promise<number> {
  const { rows } = await pool.query('SELECT COUNT(*) FROM likes WHERE commentID = $1', [commentID]);
  return rows[0];
}

//  -------------- POSTS --------------

async function dbPostPost(title: string, content: string, userID: string, re_id: string): Promise<post> {
  const { rows } = await pool.query('INSERT INTO posts (title, content, userID, re_id) VALUES ($1, $2, $3, $4) RETURNING *', [title, content, userID, re_id]);
  return (await postMapper(rows[0])) as post;
}

async function dbLikePost(userID: string, postID: string): Promise<like> {
  const { rows } = await pool.query('INSERT INTO likes (userID, postID) VALUES ($1, $2) RETURNING *', [userID, postID]);
  return likeMapper(rows[0]) as like;
}

async function dbPostComment(content: string, userID: string, postID: string): Promise<comment> {
  const { rows } = await pool.query('INSERT INTO comments (title, content, userID, postID) VALUES ($1, $2, $3, $4) RETURNING *', [content, userID, postID]);
  return (await commentMapper(rows[0])) as comment;
}

async function dbLikeComment(userID: string, commentID: string): Promise<like> {
  const { rows } = await pool.query('INSERT INTO likes (userID, commentID) VALUES ($1, $2) RETURNING *', [userID, commentID]);
  return likeMapper(rows[0]) as like;
}

//  -------------- PATCHES/UPDATES --------------

async function dbPatchPost(title: string, content: string, postID: string): Promise<post> {
  const { rows } = await pool.query('update posts set title = $1, content = $2 where postID = $3 RETURNING *', [title, content, postID]);
  return (await postMapper(rows[0])) as post;
}

async function dbPatchComment(content: string, commentID: string): Promise<comment> {
  const { rows } = await pool.query('update comments set content = $1 where commentID = $2 RETURNING *', [content, commentID]);
  return (await commentMapper(rows[0])) as comment;
}

//  -------------- DELETES --------------

async function dbDeletePost(postID: string) {
  await pool.query('delete from posts where postID = $1', [postID]);
}

async function dbUnlikePost(postID: string, userID: string) {
  await pool.query('DELETE FROM likes WHERE postID = $1 AND userID = $2', [postID, userID]);
}

async function dbDeleteComment(commentID: string) {
  await pool.query('delete from comments where commentID = $1', [commentID]);
}

async function dbUnlikeComment(commentID: string, userID: string) {
  await pool.query('DELETE FROM likes WHERE commentID = $1 AND userID = $2', [commentID, userID]);
}

export { dbCheckLikeExistsOnPost, dbCheckLikeExistsOnComment, dbGetPostsByRealEstate, dbGetPostByPostID, dbGetCommentsByPost, dbGetCommentByCommentID, dbGetLikesFromPost, dbGetLikesFromComments, dbPostPost, dbLikePost, dbPostComment, dbLikeComment, dbPatchPost, dbPatchComment, dbDeletePost, dbUnlikePost, dbDeleteComment, dbUnlikeComment };
