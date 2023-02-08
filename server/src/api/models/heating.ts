import pool from '../../config/dbconfig';
import { heatingMapper } from '../helpers';
import { heatingDTO, heating } from '../types';

async function getHeatingByRealEstate(reID: string): Promise<heating> {
  const text = 'SELECT h.heating_id, h.type, h.combustible, h.energy_certificate, h.heating_requirement, h.fgee FROM real_estate r JOIN heating h on h.heating_id = r.heating_id WHERE r.re_id = $1';
  const params = [reID];

  const { rows }: { rows: heatingDTO[] } = await pool.query(text, params);
  return (await heatingMapper(rows[0])) as heating;
}

async function getHeatingByID(id: string): Promise<heating> {
  const text = 'SELECT * FROM heating WHERE heating_id  = $1';
  const params = [id];

  const { rows }: { rows: heatingDTO[] } = await pool.query(text, params);
  return (await heatingMapper(rows[0])) as heating;
}

export { getHeatingByRealEstate, getHeatingByID };
