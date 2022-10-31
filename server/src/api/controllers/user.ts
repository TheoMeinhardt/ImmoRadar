import { Request, Response } from 'express';

import * as db from '../models';
import { user } from '../types/user';
import { userValidator } from '../validators';

// ----
// GETs
// ----

// Controller for sending all users to the client
async function getAllUsers(req: Request, res: Response): Promise<void> {
  const users: user[] = await db.getAllUsers();
  res.status(200).json(users);
}

// Controller for sending one user with specified id to client
async function getUserById(req: Request, res: Response): Promise<void> {
  const id: string = req.params.id;
  const userById: user = await db.getUserById(id);

  if (userById) res.status(200).json(userById);
  else res.status(404).send('Not found');
}

// -----
// POSTs
// -----

// Controller for adding a User with data from client to database
async function addUser(req: Request, res: Response): Promise<void> {
  const newUser: user = req.body;

  // JSON validation
  userValidator(newUser);
  if (!userValidator.errors) {
    const addedUser = await db.addUser(newUser);

    if (!addedUser) res.status(500).end();
    res.status(200).end();
  } else {
    res.status(400).send(userValidator.errors);
  }
}

export { getAllUsers, getUserById, addUser };
