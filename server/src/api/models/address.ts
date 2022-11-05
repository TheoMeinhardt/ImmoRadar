import pool from '../../config/dbconfig';

import { addressMapper } from '../helpers';
import { address, addressDTO } from '../types';

async function getAllAddresses(): Promise<address[]> {
  const text = 'select * from address';

  const { rows }: { rows: addressDTO[] } = await pool.query(text, []);
  return addressMapper(rows) as address[];
}

async function getAddress(id: string): Promise<address | undefined> {
  const text = 'select * from address where address_id = $1';
  const params = [id];

  const { rows }: { rows: addressDTO[] } = await pool.query(text, params);
  return rows[0] ? (addressMapper(rows[0]) as address) : undefined;
}

export { getAllAddresses, getAddress };
