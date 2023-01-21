import pool from '../../config/dbconfig';
import { image } from '../types';

async function postImage(newImage: image): Promise<image> {
  const text = 'insert into image (image_id, image, name, description, re_id) values ($1, $2, $3, $4, $5) returning *';
  const params = [newImage.imageID, newImage.path, newImage.name ?? null, newImage.description ?? null, newImage.reID];

  const { rows }: { rows: image[] } = await pool.query(text, params);
  return rows[0];
}

export { postImage };
