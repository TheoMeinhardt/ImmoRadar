import { Request, Response } from 'express';
import { dbGetSessionID, dbPatchSessionID } from '../models/session';

async function getSessionID(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const user_id = id;
  const sessionID = await dbGetSessionID(user_id);
  if (!sessionID) res.status(404).send('Ressource not found');
  res.status(200).json(sessionID);
}

async function patchSessionID(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const user_id = id;
  if (!req.body) res.status(400).json('error');
  const sessionID = await dbPatchSessionID(req.body, user_id);
  res.status(200).json(sessionID);
}

// const deleteSessionID = async (req, res) => {
//   const { id } = req.params;
//   const user_id = id;
//   const sessionID = await dbGetSessionID(user_id);
//   if (sessionID == null) return res.status(404).send('User does not have session id!');
//   const deltedSessionID = await dbDeleteSessionID(user_id);
//   return res.status(200).json(deltedSessionID);
// };

export { getSessionID, patchSessionID };
