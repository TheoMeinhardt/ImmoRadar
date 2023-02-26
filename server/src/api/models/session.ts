/* eslint-disable camelcase */
import pool from '../../config/dbconfig';

const dbGetSessionID = async (userID: string) => {
  const { rows } = await pool.query('SELECT session_id FROM users WHERE user_id = $1', [userID]);
  return rows[0];
};

const dbGetUserBySession = async (session_id: string) => {
  const { rows } = await pool.query('SELECT user_id FROM users WHERE session_id = $1', [session_id]);
  return rows[0];
};

const dbPatchSessionID = async (session_id: string, userID: string) => {
  console.log(session_id, userID);
  const { rows } = await pool.query(
    'UPDATE users set session_id = $1 where user_id = $2 returning *',
    [session_id, userID],
  );
  return rows;
};

// const dbDeleteSessionID = async (userID: string) => {
//   console.log(userID);
//   const { rows } = await pool.query(
//     'UPDATE users set session_id = null where user_id = $1 returning *',
//     [userID],
//   );
//   return rows;
// };

export { dbGetSessionID, dbPatchSessionID, dbGetUserBySession };
