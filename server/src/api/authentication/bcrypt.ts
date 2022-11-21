import { hash, compare } from 'bcrypt';

const saltRounds = 12;

async function hashString(str: string): Promise<string> {
  return hash(str, saltRounds);
}

function checkPassword(plainPW: string, hashedPW: string): Promise<boolean> {
  return compare(plainPW, hashedPW);
}

export { hashString, checkPassword };
