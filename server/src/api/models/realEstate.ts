import pool from '../../config/dbconfig';
import { realEstateMapper } from '../helpers';
import { realEstate, realEstateDTO } from '../types';

async function getAllRealEstates(): Promise<realEstate[]> {
  const text: string = 'select * from real_estate;';
  const { rows }: { rows: realEstateDTO[] } = await pool.query(text, []);

  return realEstateMapper(rows) as realEstate[];
}

async function getOneRealEstate(id: string): Promise<realEstate> {
  const text: string = 'select * from real_estate where re_id = $1';
  const args: any[] = [id];
  const { rows }: { rows: realEstateDTO[] } = await pool.query(text, args);

  return realEstateMapper(rows) as realEstate;
}

export { getAllRealEstates, getOneRealEstate };
