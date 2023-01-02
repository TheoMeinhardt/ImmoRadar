import { dbGetSession, dbPostSession } from '../models/session.js';

const getSession = async (req, res) => {
  const { id } = req.params;
  const session = await dbGetSession(id);
  if (!session) return res.status(404).send('Ressource not found');
  return res.status(200).json(session);
};

const postSession = async (req, res) => {
  if (!req.body) return res.status(400).json('error');
  const session = await dbPostSession(req.body);
  return res.status(200).json(session);
};

export { getSession, postSession };
