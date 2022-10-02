import { Request, Response } from 'express';
import * as db from '../models';
import { user } from '../types/user';

async function getAllUsers(req: Request, res: Response): Promise<void> {
  const users: user[] = await db.getAllUsers();
  res.status(200).json(users);
}

async function getUserById(req: Request, res: Response): Promise<void> {
  const id: string = req.params.id;
  const userById: user = await db.getUserById(id);
  console.log('test');

  if (userById) res.status(200).json(userById);
  else res.status(404).send('Not found');
}

export { getAllUsers, getUserById };
