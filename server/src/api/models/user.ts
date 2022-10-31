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
  const params = [id];
  const { rows }: { rows: userDTO[] } = await pool.query(text, params);

  return userMapper(rows[0]) as user;
}

async function addUser(newUser: user): Promise<user | undefined> {
  const text: string = 'insert into users (user_id, username, address_id, company, phone, email, photo_id, profile_pic, user_password) values (default, $1, $2, $3, $4, $5, $6, $7, $8) returning *';
  const params = [newUser.name, newUser.addressID, newUser.company, newUser.phone, newUser.email, null, newUser.profilePic, newUser.password];

  const { rows }: { rows: userDTO[] } = await pool.query(text, params);
  return rows[0] ? (userMapper(rows[0]) as user) : undefined;
}

export { getAllUsers, getUserById, addUser };
