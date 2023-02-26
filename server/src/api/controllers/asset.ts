import { Request, Response } from 'express';
import { asset } from '../types';
import * as db from '../models';

async function getAssets(req: Request, res: Response): Promise<void> {
  const assets: asset[] = await db.getAssets();

  res.status(200).json(assets);
}

export { getAssets };
