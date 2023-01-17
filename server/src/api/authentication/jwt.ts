import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { jwtScope } from '../types';

dotenv.config();

function signJWT(payload: jwt.JwtPayload, scope: jwtScope): string {
  const options: jwt.SignOptions = {
    algorithm: 'HS256',
    expiresIn: 600000,
    subject: jwtScope[scope],
  };

  // eslint-disable-next-line no-param-reassign
  payload.iat = Date.now();
  return jwt.sign(payload, process.env.SECRET_JWT_KEY ?? '', options);
}

function verifyJwt(token: string): jwt.JwtPayload | undefined {
  try {
    return jwt.verify(token, process.env.SECRET_JWT_KEY ?? '') as jwt.JwtPayload;
  } catch (err: any) {
    console.log(err);
    return undefined;
  }
}

export { signJWT, verifyJwt };
