import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function signJWT(payload: jwt.JwtPayload): string {
  const options: jwt.SignOptions = {
    algorithm: 'HS256',
    expiresIn: 900000,
  };

  // eslint-disable-next-line no-param-reassign
  payload.iat = Date.now();
  return jwt.sign(payload, process.env.SECRET_JWT_KEY ?? '', options);
}

function verifyJwt(token: string): boolean {
  try {
    jwt.verify(token, process.env.SECRET_JWT_KEY ?? '');
    return true;
  } catch (err: any) {
    console.log(err);
    return false;
  }
}

export { signJWT, verifyJwt };
