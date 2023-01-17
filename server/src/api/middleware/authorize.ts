import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../authentication';
import { jwtScope } from '../types';

function authorize(scope: jwtScope): any {
  return (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization;

    if (!token) res.status(400).send('No Authorization Token specified');
    else {
      const payload = verifyJwt(token);

      if (payload?.sub) {
        if (Object.keys(jwtScope).indexOf(payload.sub) - 3 >= scope) {
          next();
        } else res.status(403).send('Forbidden');
      } else res.status(401).send('Unauthorized');
    }
  };
}

export default authorize;
