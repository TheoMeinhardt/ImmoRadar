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

async function addRealEstate(newRealEstate: realEstate): Promise<realEstate> {
  const text = 'insert into real_estate (re_id, name, subname, description, address_id, property_area, usable_area, outside_area, rooms, bathrooms, bedrooms, buyable, price, user_id, provision, heating_id, document_id) values (default, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) returning *';
  const args: any[] = [newRealEstate.name, newRealEstate.subname, newRealEstate.description, newRealEstate.addressID, newRealEstate.propertyArea, newRealEstate.usableArea, newRealEstate.outsideArea, newRealEstate.rooms, newRealEstate.bathrooms, newRealEstate.bedrooms, newRealEstate.buyable, newRealEstate.price, newRealEstate.userID, newRealEstate.provision, newRealEstate.heatingID, newRealEstate.documentID];
  const { rows }: { rows: realEstateDTO[] } = await pool.query(text, args);

  console.log(rows[0]);
  return realEstateMapper(rows[0]) as realEstate;
}

export { getAllRealEstates, getOneRealEstate, addRealEstate };
