import { Request, Response } from 'express';

import { realEstate } from '../types';
import * as db from '../models';

async function getAllRealEstates(req: Request, res: Response): Promise<void> {
  const allRealEstates: realEstate[] = await db.getAllRealEstates();
  res.status(200).json(allRealEstates);
}

export { getAllRealEstates };
