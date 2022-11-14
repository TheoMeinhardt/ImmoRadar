import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../authentication';

function authenticated(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers.authorization;

  if (!token) res.status(400).send('No Authorization Token specified');
  else if (verifyJwt(token)) next();
  else res.status(401).send('Unauthorized');
}

export default authenticated;
