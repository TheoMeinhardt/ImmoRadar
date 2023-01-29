import { dbGetSessionID, dbPostSessionID } from '../models/session.js';

const getSessionID = async (req, res) => {
  const { id } = req.params;
  const user_id = id;
  const sessionID = await dbGetSessionID(user_id);
  if (!sessionID) return res.status(404).send('Ressource not found');
  return res.status(200).json(sessionID);
};

const postSessionID = async (req, res) => {
  const { id } = req.params;
  const user_id = id;
  if (!req.body) return res.status(400).json('error');
  const sessionID = await dbPostSessionID(req.body, user_id);
  return res.status(200).json(sessionID);
};

// const deleteSessionID = async (req, res) => {
//   const { id } = req.params;
//   const user_id = id;
//   const sessionID = await dbGetSessionID(user_id);
//   if (sessionID == null) return res.status(404).send('User does not have session id!');
//   const deltedSessionID = await dbDeleteSessionID(user_id);
//   return res.status(200).json(deltedSessionID);
// };

export { getSessionID, postSessionID };
