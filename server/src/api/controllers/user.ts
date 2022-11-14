import { Request, Response } from 'express';

import * as db from '../models';
import { user } from '../types';
import { userValidator } from '../validators';
import { userExists, hashString } from '../helpers';

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
  const userById = await db.getUserById(id);

  if (userById) res.status(200).json(userById);
  else res.status(404).send('User not found');
}

// -----
// POSTs
// -----

// Controller for adding an User with data from client to database
async function addUser(req: Request, res: Response): Promise<void> {
  const newUser: user = req.body;

  // JSON validation
  if (userValidator(newUser)) {
    newUser.password = await hashString(newUser.password);
    const addedUser = await db.addUser(newUser);

    if (!addedUser) res.status(500).end();
    res.status(200).end();
  } else {
    res.status(400).send(userValidator.errors);
  }
}

// ------
// PATCHs
// ------

// Controller for patching an existing user with new data from client
async function updateUser(req: Request, res: Response): Promise<void> {
  const id = req.params.id;
  const data = req.body;

  // check if user exists
  if (await userExists(id)) {
    const oldUser: user = (await db.getUserById(id)) as user;
    const newUser: user = { ...oldUser, ...data };

    // JSON validation
    if (userValidator(newUser)) {
      const updatedUser: user = await db.patchUser(id, newUser);
      res.status(200).send(`updated user with id "${updatedUser.userID}"`);
    } else {
      res.status(400).send(userValidator.errors);
    }
  } else {
    res.status(400).send(`User with id "${id} does not exist"`);
  }
}

// -------
// DELETEs
// -------

// Controller for deleteing an User with specified id sent by Client
async function deleteUser(req: Request, res: Response): Promise<void> {
  const id: string = req.params.id;

  // check if user exists
  if (await userExists(id)) {
    const deletedUser = await db.deleteUser(id);

    if (deletedUser) res.status(200).send(`deleted user with id "${deletedUser.userID}"`);
    else res.status(500).end();
  } else {
    res.status(400).send(`user with id "${id}" does not exist`);
  }
}

export { getAllUsers, getUserById, addUser, updateUser, deleteUser };
