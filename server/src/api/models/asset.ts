import pool from '../../config/dbconfig';
import { assetMapper } from '../helpers';
import { asset, assetDTO } from '../types';

async function getAssets(): Promise<asset[]> {
  const text = 'SELECT * FROM asset';

  const { rows }: { rows: assetDTO[] } = await pool.query(text, []);
  return assetMapper(rows) as asset[];
}

async function getAssetsByRealEstate(reID: string): Promise<asset[]> {
  const text = 'SELECT a.asset_id, a.name, a.icon FROM real_estate_asset JOIN asset a on a.asset_id = real_estate_asset.asset_id WHERE re_id = $1 ORDER BY a.name ASC;';
  const params = [reID];

  const { rows }: { rows: assetDTO[] } = await pool.query(text, params);
  return assetMapper(rows) as asset[];
}

export { getAssets, getAssetsByRealEstate };
