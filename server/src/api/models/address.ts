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

async function addAddress(newAddress: address): Promise<address> {
  const text =
    'insert into address (address_id, address, zip_code, city, state, country) values (default, $1, $2, $3, $4, $5) returning *';
  const params = [
    newAddress.address,
    newAddress.zip,
    newAddress.city,
    newAddress.state,
    newAddress.country,
  ];

  const { rows }: { rows: addressDTO[] } = await pool.query(text, params);
  return addressMapper(rows[0]) as address;
}

async function updateAdress(id: string, newAddress: address): Promise<address> {
  const text =
    'update address set address = $1, zip_code = $2, city = $3, state = $4, country = $5 where address_id = $6 returning *';
  const params = [
    newAddress.address,
    newAddress.zip,
    newAddress.city,
    newAddress.state,
    newAddress.country,
    id,
  ];

  const { rows }: { rows: addressDTO[] } = await pool.query(text, params);
  return addressMapper(rows[0]) as address;
}

async function deleteAddress(id: string): Promise<address | undefined> {
  const text = 'delete from address where address_id = $1';
  const params = [id];

  const { rows }: { rows: addressDTO[] } = await pool.query(text, params);
  return rows[0] ? (addressMapper(rows[0]) as address) : undefined;
}

export { getAllAddresses, getAddress, addAddress, updateAdress, deleteAddress };
