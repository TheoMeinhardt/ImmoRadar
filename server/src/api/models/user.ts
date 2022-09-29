import pool from '../../config/dbconfig';
import { userMapper } from '../helpers';
import { user, userDTO } from '../types/user';

async function getAllUsers(): Promise<user[]> {
  const text = 'select * from users';
  const { rows }: { rows: userDTO[] } = await pool.query(text, []);

  return userMapper(rows) as user[];
}

async function getUserById(id: string): Promise<user> {
  const text = 'select * from users where user_id = $1';
  const args = [id];
  const { rows }: { rows: userDTO[] } = await pool.query(text, args);

  return userMapper(rows[0]) as user;
}

export { getAllUsers, getUserById };
