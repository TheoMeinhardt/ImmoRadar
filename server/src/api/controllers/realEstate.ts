import { Request, Response, raw } from 'express';
import Stripe from 'stripe';
import { address, mapquestRes, realEstate, shortRealEstate } from '../types';
import { makeReadableAddress, addressGeocode } from '../helpers';
import { realEstateValidator } from '../validators';
import * as db from '../models';

const stripe: Stripe = new Stripe(process.env.SECRET_KEY ? process.env.SECRET_KEY : '', {
  apiVersion: '2022-08-01',
  appInfo: {
    name: 'immoradar',
    version: '0.0.1',
    url: 'immoradar.at',
  },
});

// ---------------
// GET Controllers
// ---------------

// Controller for sending all Real Estates to the client
async function getAllRealEstates(req: Request, res: Response): Promise<void> {
  const allRealEstates: realEstate[] = await db.getAllRealEstates();
  res.status(200).json(allRealEstates);
}

// Controller for sending one Real Estate with specified id to the client
async function getOneRealEstate(req: Request, res: Response): Promise<void> {
  const id: string = req.params.id;
  const oneRealEstate = await db.getOneRealEstate(id);

  if (oneRealEstate) {
    res.status(200).json(oneRealEstate);
  } else res.status(404).send('Not Found');
}

// Controller for sending a shortend selection auf Real Estate Properties to client
async function getShortendRealEstates(req: Request, res: Response): Promise<void> {
  const longRealEstates: realEstate[] = await db.getAllRealEstates();
  const shortRealEstates: shortRealEstate[] = [];

  for await (const { name, address: adrs, price, usableArea, rooms, images } of longRealEstates) {
    const geoinfo: mapquestRes = await addressGeocode(adrs as address);

    shortRealEstates.push({
      name,
      address: adrs ? makeReadableAddress(adrs) : undefined,
      lat: geoinfo.results[0].locations[0].latLng.lat,
      long: geoinfo.results[0].locations[0].latLng.lng,
      price,
      thumbnail: images[0],
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
    const originalAddress = originalRealEstate.address;

    // create a new real estate object with the data from the original real estate and overwrite every property with the data from the real estate data object
    const patchedRealEstate: realEstate = { ...originalRealEstate, ...realEstateData };
    patchedRealEstate.address = realEstateData.address ? { ...originalAddress, ...realEstateData.address } : originalAddress;

    // Json verification
    realEstateValidator(patchedRealEstate);
    if (!realEstateValidator.errors) {
      const newRealEstate: realEstate = await db.patchRealEstate(id, patchedRealEstate);
      await db.updateAdress(patchedRealEstate.addressID, patchedRealEstate.address as address);

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

// --------------
// Strip Bullshit
// --------------

async function postToWebhook(req: Request, res: Response): Promise<void> {
  raw({ type: 'application/json' });
  const sig = req.headers['stripe-signature'];
  let event: any;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig as string | string[] | Buffer, process.env.END_POINT_SECRET ?? '');
  } catch (err: any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object;
      console.log(`${paymentIntent} was successful!`);
      break;
    }
    case 'payment_method.attached': {
      const paymentMethod = event.data.object;
      console.log(`${paymentMethod} was attached to a Customer!`);
      break;
    }
    default: {
      console.log(`Unhandled event type ${event.type}`);
    }
  }
  res.json({ received: true });
}

export { getAllRealEstates, getOneRealEstate, getShortendRealEstates, addRealEstate, deleteRealEstate, patchRealEstate, postToWebhook };
