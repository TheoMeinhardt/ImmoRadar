// import { Request, Response } from 'express';
// import { dbGetSessionID, dbPatchSessionID, dbGetUserBySession } from '../models/session';

// async function getSessionID(req: Request, res: Response): Promise<void> {
//   const { id } = req.params;
//   const userID = id;
//   const sessionID = await dbGetSessionID(userID);
//   if (!sessionID) res.status(404).send('Ressource not found');
//   res.status(200).json(sessionID);
// }

// async function getUserBySession(req: Request, res: Response): Promise<void> {
//   const { session_id } = req.params;
//   const userID = await dbGetUserBySession(session_id);
//   if (!userID) res.status(200).json('data');
//   res.status(200).json(userID);
// }

// async function patchSessionID(req: Request, res: Response): Promise<void> {
//   const { id } = req.params;
//   const { session_id } = req.body;
//   const userID = id;

//   if (!session_id) {
//     return res.status(400).json({ error: 'No session_id provided' });
//   }

//   try {
//     // Check if the Stripe session exists
//     const stripeSession = await stripe.checkout.sessions.retrieve(session_id);
//   } catch (error) {
//     return res.status(404).json({ error: 'Session not found' });
//   }

//   // Check if the user already has a session_id
//   const existingSession = await dbGetSessionID(userID);
//   if (existingSession) {
//     return res.status(400).json({ error: 'User already has a session_id' });
//   }

//   // Check if the session_id is already associated with another user
//   const existingUser = await dbGetUserBySession(session_id);
//   if (existingUser) {
//     return res.status(400).json({ error: 'Session_id already associated with another user' });
//   }

//   // If all checks pass, update the user's session_id
//   const updatedSessionID = await dbPatchSessionID(session_id, userID);
//   res.status(200).json(updatedSessionID);
// }

// export { getSessionID, patchSessionID, getUserBySession };
