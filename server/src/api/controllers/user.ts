import { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';

import * as db from '../models';
import { user, jwtScope } from '../types';
import { userValidator } from '../validators';
import { userExists } from '../helpers';
import * as auth from '../authentication';

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
    if (await db.getUserByEmail(newUser.email)) {
      res.status(400).send('This email is already in use!');
      return;
    }

    newUser.password = await auth.hashString(newUser.password);
    const addedUser = await db.addUser(newUser);
    if (addedUser?.address) await db.addAddress(addedUser.address);

    if (!addedUser) res.status(500).end();
    res.status(200).end();
  } else {
    console.log(userValidator.errors);
    res.status(400).send(userValidator.errors);
  }
}

// Controller which handles logins
async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;
  const existingUser: user | undefined = await db.getUserByEmail(email);

  if (!existingUser) res.status(400).send('User does not exist!');

  if (await auth.checkPassword(password, existingUser?.password as string)) {
    const payload: JwtPayload = {
      iss: existingUser?.email,
      aud: 'client',
    };

    const returnObj = {
      jwt: auth.signJWT(payload, jwtScope.apiuser),
      user: existingUser,
    };

    res.status(200).json(returnObj);
  } else {
    res.status(200).send(false);
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
      if (newUser.address) {
        if (newUser.address.addressID) {
          const addedAddress = await db.updateAdress(newUser.address.addressID, newUser.address);
          newUser.address.addressID = addedAddress.addressID;
        } else {
          const addedAddress = await db.addAddress(newUser.address);
          newUser.address.addressID = addedAddress.addressID;
        }
      }

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
    if (deletedUser?.address?.addressID) await db.deleteAddress(deletedUser.address.addressID);

    if (deletedUser) res.status(200).send(`deleted user with id "${deletedUser.userID}"`);
    else res.status(500).end();
  } else {
    res.status(400).send(`user with id "${id}" does not exist`);
  }
}

export { getAllUsers, getUserById, addUser, login, updateUser, deleteUser };
