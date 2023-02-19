import pool from '../../config/dbconfig';
import { image, imageDTO } from '../types';
import { imageMapper } from '../helpers';

async function getImagesByRealEstate(reID: string): Promise<image[]> {
  const text = 'select * from image where re_id = $1';
  const params = [reID];

  const { rows }: { rows: imageDTO[] } = await pool.query(text, params);
  return imageMapper(rows) as image[];
}

async function postImage(newImage: image): Promise<image> {
  const text = 'insert into image (image_id, image, name, description, re_id) values ($1, $2, $3, $4, $5) returning *';
  const params = [newImage.imageID, newImage.path, newImage.name ?? null, newImage.description ?? null, newImage.reID];

  const { rows }: { rows: imageDTO[] } = await pool.query(text, params);
  return imageMapper(rows[0]) as image;
}

export { getImagesByRealEstate, postImage };
