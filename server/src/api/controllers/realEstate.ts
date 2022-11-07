import { Request, Response } from 'express';

import { address, realEstate, shortRealEstate } from '../types';
import { makeReadableAddress } from '../helpers';
import { realEstateValidator } from '../validators';
import * as db from '../models';

// ---------------
// GET Controllers
// ---------------

// Controller for sending all Real Estates to the client
async function getAllRealEstates(req: Request, res: Response): Promise<void> {
  const allRealEstates: realEstate[] = await db.getAllRealEstates();

  for await (const re of allRealEstates) {
    re.address = await db.getAddress(re.addressID);
  }

  res.status(200).json(allRealEstates);
}

// Controller for sending one Real Estate with specified id to the client
async function getOneRealEstate(req: Request, res: Response): Promise<void> {
  const id: string = req.params.id;
  const oneRealEstate = await db.getOneRealEstate(id);

  if (oneRealEstate) {
    oneRealEstate.address = await db.getAddress(oneRealEstate.addressID);

    res.status(200).json(oneRealEstate);
  } else res.status(404).send('Not Found');
}

// Controller for sending a shortend selection auf Real Estate Properties to client
async function getShortendRealEstates(req: Request, res: Response): Promise<void> {
  const longRealEstates: realEstate[] = await db.getAllRealEstates();
  const shortRealEstates: shortRealEstate[] = [];

  for await (const { name, addressID, price, usableArea, rooms } of longRealEstates) {
    const adrs = await db.getAddress(addressID);
    shortRealEstates.push({
      name,
      address: adrs ? makeReadableAddress(adrs) : undefined,
      price,
      usableArea,
      rooms,
    });
  }

  res.status(200).json(shortRealEstates);
}

// ----------------
// POST Controllers
// ----------------

// Controller for adding a new Real Estate sent by the client
async function addRealEstate(req: Request, res: Response): Promise<void> {
  const newRealEstate: realEstate = req.body;

  // Json verification
  realEstateValidator(newRealEstate);
  if (!realEstateValidator.errors && newRealEstate.address) {
    const addedAddress: address = await db.addAddress(newRealEstate.address);
    newRealEstate.address.addressID = addedAddress.addressID;
    const addedRealEstate: realEstate = await db.addRealEstate(newRealEstate);

    if (!addedRealEstate) res.status(500).send(addRealEstate);
    else if (!addedAddress) res.status(500).send(addedAddress);
    res.status(200).end();
  } else {
    res.status(400).send(realEstateValidator.errors);
  }
}

// -----------------
// PATCH Controllers
// -----------------

// Controller for patching a real estate with id and data sent by client
async function patchRealEstate(req: Request, res: Response): Promise<void> {
  const id: string = req.params.id;
  const realEstateData: realEstate = req.body;
  const originalRealEstate = await db.getOneRealEstate(id);

  // check if real estate exists
  if (originalRealEstate) {
    // create a new real estate object with the data from the original real estate and overwrite every property with the data from the real estate data object
    const patchedRealEstate: realEstate = { ...originalRealEstate, ...realEstateData };

    // Json verification
    realEstateValidator(patchedRealEstate);
    if (!realEstateValidator.errors) {
      const newRealEstate: realEstate = await db.patchRealEstate(id, patchedRealEstate);

      res.status(200).send(`updated real estate with id "${newRealEstate.reID}"`);
    } else {
      res.status(400).send(realEstateValidator.errors);
    }
  } else {
    res.status(404).send(`real estate with id "${id}" does not exist`);
  }
}

// ------------------
// DELETE Controllers
// ------------------

// Controller for deleting a real estate in the database by id sent by user
async function deleteRealEstate(req: Request, res: Response): Promise<void> {
  const reID: string = req.params.id;

  if (await db.getOneRealEstate(reID)) {
    const deletedRealEstate = await db.deleteRealEstate(reID);

    if (!deletedRealEstate) res.status(500).end();
    else {
      await db.deleteAddress(deletedRealEstate?.addressID);
      res.status(200).send(`deleted real estate "${deletedRealEstate?.name}"`);
    }
  } else {
    res.status(404).send(`real estate with id "${reID}" does not exist`);
  }
}

export { getAllRealEstates, getOneRealEstate, getShortendRealEstates, addRealEstate, deleteRealEstate, patchRealEstate };
