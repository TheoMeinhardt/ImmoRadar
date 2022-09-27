import { Request, Response } from 'express';

import { realEstate } from '../types';
import * as db from '../models';

// Controller for sending all Real Estates to the client
async function getAllRealEstates(req: Request, res: Response): Promise<void> {
  const allRealEstates: realEstate[] = await db.getAllRealEstates();
  res.status(200).json(allRealEstates);
}

// Controller for sending one Real Estate with specified id to the client
async function getOneRealEstate(req: Request, res: Response): Promise<void> {
  const id: string = req.params.id;
  const oneRealEstate: realEstate = await db.getOneRealEstate(id);

  if (oneRealEstate) res.status(200).json(oneRealEstate);
  else res.status(404).send('Not Found');
}

export { getAllRealEstates, getOneRealEstate };
