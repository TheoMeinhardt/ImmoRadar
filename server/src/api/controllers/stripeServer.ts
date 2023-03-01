/* eslint-disable camelcase */
import { Request, Response } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

import { dbGetSessionID, dbPatchSessionID, dbGetUserBySession } from '../models/session';

dotenv.config();

const stripe: Stripe = new Stripe('sk_test_51LkOYYKr94hGO7PCiTzlKx8duhxgMbUypUcWf47njwy5dVir6eRltBlKxa7hrVjB8Dd1Eqb65PmKAwTYEE0wfFpw00PE0OM81E' as string, {
  apiVersion: '2022-08-01',
  appInfo: {
    name: 'immoradar',
    version: '0.0.1',
    url: 'immoradar.co.at',
  },
});

async function postToWebhook(req: Request, res: Response): Promise<void> {
  let event: any;
  const sig: any = req.headers['stripe-signature'];
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.END_POINT_SECRET as string);
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

async function createCheckout(req: Request, res: Response): Promise<void> {
  try {
    const prices = await stripe.prices.list({
      lookup_keys: [req.body.lookup_key],
      expand: ['data.product'],
    });
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      billing_address_collection: 'auto',
      line_items: [
        {
          price: prices.data[0].id,
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:8080/#/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:8080/#/cancel',
    });
    res.status(200).send(session);
  } catch (error) {
    console.error(error);
  }
}

async function createPortal(req: Request, res: Response): Promise<void> {
  // VOn Datenbank holen
  const { session } = req.body;
  const session_id = session.id;
  const checkout_session = await stripe.checkout.sessions.retrieve(session_id);
  const returnUrl = 'http://localhost:8080';

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: checkout_session.customer as string,
    return_url: returnUrl,
  });
  res.status(200).send(portalSession.url);
}

// async function checkoutSession(req: Request, res: Response): Promise<void> {
//   try {
//     const { session_id } = req.params;
//     const session = await stripe.checkout.sessions.retrieve(session_id as any);
//     res.status(200).send(session);
//   } catch (error: any) {
//     console.error(`ERROR: ${error.type}`);
//     res.status(200).json(error.type);
//   }
// }

async function getSessionID(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const userID = id;
  const sessionID = await dbGetSessionID(userID);
  if (!sessionID) res.status(404).send('Ressource not found');
  res.status(200).json(sessionID);
}

async function getUserBySession(req: Request, res: Response): Promise<void> {
  const { session_id } = req.params;
  const userID = await dbGetUserBySession(session_id);
  if (!userID) res.status(200).json('data');
  res.status(200).json(userID);
}

async function patchSessionID(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const { session_id } = req.body;
  const userID = id;

  if (!session_id) {
    console.log('No session_id provided');

    res.status(400).json({ error: 'No session_id provided' });
    return;
  }

  try {
    // Check if the Stripe session exists
    const stripeSession = await stripe.checkout.sessions.retrieve(session_id);
    console.log(stripeSession);
  } catch (error) {
    console.log('Session not found');
    res.status(200).json({ error: 'Session not found' });
    return;
  }

  // Check if user exists in database
  const existingUser1 = await dbGetUserBySession(userID);
  if (existingUser1) {
    console.log('User not found');
    res.status(200).json({ error: 'User not found' });
    return;
  }

  // Check if the user already has a session_id
  const existingSession = await dbGetSessionID(userID);
  if (existingSession) {
    console.log('User already has a session_id');
    res.status(200).json({ error: 'User already has a session_id' });
    return;
  }

  // Check if the session_id is already associated with another user
  const existingUser2 = await dbGetUserBySession(session_id);
  if (existingUser2) {
    console.log('Session_id already associated with another user');
    res.status(200).json({ error: 'Session_id already associated with another user' });
    return;
  }

  // If all checks pass, update the user's session_id
  const updatedSessionID = await dbPatchSessionID(session_id, userID);
  console.log('OK');
  res.status(200).json(updatedSessionID);
}

// StripeInvalidRequestError
export { postToWebhook, createCheckout, createPortal, getSessionID, patchSessionID, getUserBySession };
