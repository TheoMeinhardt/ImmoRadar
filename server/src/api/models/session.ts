import pool from '../../config/dbconfig';

const dbGetSessionID = async (userID: string) => {
  const { rows } = await pool.query('SELECT session_id FROM users WHERE user_id=$1', [userID]);
  return rows[0];
};

const dbPatchSessionID = async (
  { session_id: sessionID }: { session_id: string },
  userID: string,
) => {
  const { rows } = await pool.query(
    'UPDATE users set session_id = $1 where user_id = $2 returning *',
    [sessionID, userID],
  );
  return rows[0];
};

// const dbDeleteSessionID = async ({ user_id }) => {
//   const { rows } = await query(
//     'UPDATE users SET session_id = NULL WHERE user_id = $2 returning *',
//     [user_id],
//   );
//   return rows[0];
// };

export { dbGetSessionID, dbPatchSessionID };
