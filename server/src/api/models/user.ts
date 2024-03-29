import pool from '../../config/dbconfig';
import { userMapper } from '../helpers';
import { user, userDTO } from '../types';

async function getAllUsers(): Promise<user[]> {
  const text = 'select * from users';
  const { rows }: { rows: userDTO[] } = await pool.query(text, []);

  return (await userMapper(rows)) as user[];
}

async function getUserById(id: string): Promise<user | undefined> {
  const text = 'select * from users where user_id = $1';
  const params = [id];
  const { rows }: { rows: userDTO[] } = await pool.query(text, params);

  return rows[0] ? ((await userMapper(rows[0])) as user) : undefined;
}

async function getUserByEmail(email: string): Promise<user | undefined> {
  const text = 'select * from users where email = $1';
  const params = [email];
  const { rows }: { rows: userDTO[] } = await pool.query(text, params);

  return rows[0] ? ((await userMapper(rows[0])) as user) : undefined;
}

async function addUser(newUser: user): Promise<user | undefined> {
  const text: string = 'insert into users (user_id, username, firstname, middlename, lastname, address_id, company, phone, email, photo_id, profile_pic, user_password) values (default, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *';
  const params = [newUser.username, newUser.firstname, newUser.middlename, newUser.lastname, newUser.address?.addressID, newUser.company, newUser.phone, newUser.email, null, newUser.profilePic, newUser.password];

  const { rows }: { rows: userDTO[] } = await pool.query(text, params);
  return rows[0] ? ((await userMapper(rows[0])) as user) : undefined;
}

async function patchUser(id: string, data: user): Promise<user> {
  const text = 'update users set username = $1, address_id = $2, company = $3, phone = $4, email = $5, photo_id = null, profile_pic = $6, user_password = $7, firstname = $8, middlename = $9, lastname = $10 where user_id = $11 returning *';
  const params = [data.username, data.address?.addressID, data.company, data.phone, data.email, data.profilePic, data.password, data.firstname, data.middlename, data.lastname, id];

  const { rows }: { rows: userDTO[] } = await pool.query(text, params);
  if (!rows[0]) throw new Error('DB Error');
  return (await userMapper(rows[0])) as user;
}

async function deleteUser(id: string): Promise<user | undefined> {
  const text = 'delete from users where user_id = $1 returning *';
  const params = [id];

  const { rows }: { rows: userDTO[] } = await pool.query(text, params);
  return rows[0] ? ((await userMapper(rows[0])) as user) : undefined;
}

export { getAllUsers, getUserById, getUserByEmail, addUser, patchUser, deleteUser };
