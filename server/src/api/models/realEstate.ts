import pool from '../../config/dbconfig';
import { realEstateMapper } from '../helpers';
import { realEstate, realEstateDTO } from '../types';

async function getAllRealEstates(): Promise<realEstate[]> {
  const text: string = 'select * from real_estate;';
  const { rows }: { rows: realEstateDTO[] } = await pool.query(text, []);

  return realEstateMapper(rows) as realEstate[];
}

async function getOneRealEstate(id: string): Promise<realEstate | undefined> {
  const text: string = 'select * from real_estate where re_id = $1';
  const params: any[] = [id];
  const { rows }: { rows: realEstateDTO[] } = await pool.query(text, params);

  return rows[0] ? (realEstateMapper(rows[0]) as realEstate) : undefined;
}

async function addRealEstate(newRealEstate: realEstate): Promise<realEstate> {
  const text = 'insert into real_estate (re_id, name, subname, description, address_id, property_area, usable_area, outside_area, rooms, bathrooms, bedrooms, buyable, price, user_id, provision, heating_id, document_id) values (default, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) returning *';
  const params: any[] = [newRealEstate.name, newRealEstate.subname, newRealEstate.description, newRealEstate.addressID, newRealEstate.propertyArea, newRealEstate.usableArea, newRealEstate.outsideArea, newRealEstate.rooms, newRealEstate.bathrooms, newRealEstate.bedrooms, newRealEstate.buyable, newRealEstate.price, newRealEstate.userID, newRealEstate.provision, newRealEstate.heatingID, newRealEstate.documentID];
  const { rows }: { rows: realEstateDTO[] } = await pool.query(text, params);

  return realEstateMapper(rows[0]) as realEstate;
}

async function patchRealEstate(reID: string, newRealEstate: realEstate): Promise<realEstate> {
  const text: string = 'update real_estate set name = $1, subname = $2, description = $3, address_id = $4, property_area = $5, usable_area = $6, outside_area = $7, rooms = $8, bathrooms = $9, bedrooms = $10, buyable = $11, price = $12, user_id = $13, provision = $14, heating_id = $15, document_id = $16 where re_id = $17 returning *';
  const params: any[] = [newRealEstate.name, newRealEstate.subname, newRealEstate.description, newRealEstate.addressID, newRealEstate.propertyArea, newRealEstate.usableArea, newRealEstate.outsideArea, newRealEstate.rooms, newRealEstate.bathrooms, newRealEstate.bedrooms, newRealEstate.buyable, newRealEstate.price, newRealEstate.userID, newRealEstate.provision, newRealEstate.heatingID, newRealEstate.documentID, reID];

  const { rows }: { rows: realEstateDTO[] } = await pool.query(text, params);
  return realEstateMapper(rows[0]) as realEstate;
}

async function deleteRealEstate(reID: string): Promise<realEstate | undefined> {
  const text: string = 'delete from real_estate where re_id = $1 returning *';
  const params: any[] = [reID];

  const { rows }: { rows: realEstateDTO[] } = await pool.query(text, params);
  return rows[0] ? (realEstateMapper(rows[0]) as realEstate) : undefined;
}

export { getAllRealEstates, getOneRealEstate, addRealEstate, patchRealEstate, deleteRealEstate };
