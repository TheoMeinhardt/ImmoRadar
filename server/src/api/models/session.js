import { pool, query } from '../../config/dbconfig';

const dbGetSessionID = async ({ user_id }) => {
  const { rows } = await query('SELECT session_id FROM users WHERE user_id=$1', [user_id]);
  return rows[0];
};

const dbPostSessionID = async ({ session_id, user_id }) => {
  const { rows } = await query('UPDATE users set session_id = $1 where user_id = $2 returning *', [
    session_id,
    user_id,
  ]);
  return rows[0];
};

const dbDeleteSessionID = async ({ user_id }) => {
  const { rows } = await query(
    'UPDATE users SET session_id = NULL WHERE user_id = $2 returning *',
    [user_id],
  );
  return rows[0];
};

export { dbGetSessionID, dbPostSessionID, dbDeleteSessionID };
