import { Request, Response } from 'express';

import { realEstate } from '../types';
import { realEstateValidator } from '../validators';
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

// Controller for adding a new Real Estate sent by the client
async function addRealEstate(req: Request, res: Response): Promise<void> {
  const newRealEstate: realEstate = req.body;

  // Json verification
  realEstateValidator(newRealEstate);
  if (!realEstateValidator.errors) {
    const addedRealEstate: realEstate = await db.addRealEstate(newRealEstate);

    if (!addedRealEstate) res.status(500).send(addRealEstate);
    res.status(200).end();
  } else {
    res.status(400).send(realEstateValidator.errors);
  }
}

// Controller for deleting a real estate in the database by id sent by user
async function deleteRealEstate(req: Request, res: Response): Promise<void> {
  const reID: string = req.params.id;

  if (await db.getOneRealEstate(reID)) {
    const deletedRealEstate: realEstate = await db.deleteRealEstate(reID);
    if (!deleteRealEstate) res.status(500).end();
    res.status(200).send(`deleted real estate "${deletedRealEstate.name}"`);
  } else {
    res.status(404).send(`real estate with id "${reID}" does not exist`);
  }
}

export { getAllRealEstates, getOneRealEstate, addRealEstate, deleteRealEstate };
