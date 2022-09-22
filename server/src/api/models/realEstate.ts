import pool from '../../config/dbconfig';
import { realEstate } from '../types';

async function getAllRealEstates(): Promise<realEstate[]> {
  const text: string = 'select * from real_estate;';
  const { rows } = await pool.query(text, []);

  return rows;
}

export { getAllRealEstates };
