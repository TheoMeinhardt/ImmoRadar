import pool from '../../config/dbconfig';
import { realEstate } from '../types';

async function getAllRealEstates(): Promise<realEstate[]> {
  const text: string = 'select * from real_estate;';
  const { rows } = await pool.query(text, []);

  return rows;
}

async function getOneRealEstate(id: string): Promise<realEstate> {
  const text: string = 'select * from real_estate where re_id = $1';
  const args: any[] = [id];
  const { rows } = await pool.query(text, args);

  return rows[0];
}

export { getAllRealEstates, getOneRealEstate };
