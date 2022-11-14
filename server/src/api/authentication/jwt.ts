import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function signJWT(payload: any): string {
  const options: jwt.SignOptions = {
    algorithm: 'HS256',
    expiresIn: 900000,
  };
  return jwt.sign(payload, process.env.SECRET_JWT_KEY ?? '', options);
}

export { signJWT };
