import { Request, Response } from 'express';
import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { realEstate } from '../types';
import * as db from '../models';

dotenv.config();

const stripe: Stripe = new Stripe(process.env.SECRET_KEY, {
  apiVersion: '2022-09-28',
  appInfo: {
    name: 'immoradar',
    version: '0.0.1',
    url: 'immoradar.at',
  },
});

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

async function postToWebhook(req: Request, res: Response): Promise<void> {
  express.raw({ type: 'application/json' });
  const sig = req.headers['stripe-signature'];
  let event: any;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.END_POINT_SECRET);
  } catch (err: any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
  case 'payment_intent.succeeded': {
    const paymentIntent = event.data.object;
    console.log('PaymentIntent was successful!');
    break;
  }
  case 'payment_method.attached': {
    const paymentMethod = event.data.object;
    console.log('PaymentMethod was attached to a Customer!');
    break;
  }
  default: {
    console.log(`Unhandled event type ${event.type}`);
  }
  }
  res.json({ received: true });
}

export { getAllRealEstates, getOneRealEstate, postToWebhook };
