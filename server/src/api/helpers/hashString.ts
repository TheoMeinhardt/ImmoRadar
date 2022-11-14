import { hash } from 'bcrypt';

const saltRounds = 10;

async function hashString(str: string): Promise<string> {
  return hash(str, saltRounds);
}

export default hashString;
