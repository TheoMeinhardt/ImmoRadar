import { Request, Response } from 'express';
import { dbGetSessionID, dbPatchSessionID, dbGetUserBySession } from '../models/session';

async function getSessionID(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const userID = id;
  const sessionID = await dbGetSessionID(userID);
  if (!sessionID) res.status(404).send('Ressource not found');
  res.status(200).json(sessionID);
}

async function getUserBySession(req: Request, res: Response): Promise<void> {
  const { session_id } = req.params;
  const userID = await dbGetUserBySession(session_id);
  if (!userID) res.status(200).json('data');
  res.status(200).json(userID);
}

async function patchSessionID(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const { session_id } = req.body;
  const userID = id;
  console.log(session_id, userID);
  if (!req.body) res.status(400).json('No sessionID provided');
  console.log('test2');
  const sessionID = await dbPatchSessionID(session_id, userID);
  console.log(sessionID);
  res.status(200).json(sessionID);
}

export { getSessionID, patchSessionID, getUserBySession };
