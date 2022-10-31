import { getUserById } from '../models';

async function checkIfUserExists(id: string): Promise<boolean> {
  return (await getUserById(id)) !== undefined;
}

export default checkIfUserExists;
