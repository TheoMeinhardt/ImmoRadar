import { Request, Response } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const stripe: Stripe = new Stripe(
  'sk_test_51LkOYYKr94hGO7PCiTzlKx8duhxgMbUypUcWf47njwy5dVir6eRltBlKxa7hrVjB8Dd1Eqb65PmKAwTYEE0wfFpw00PE0OM81E' as string,
  {
    apiVersion: '2022-08-01',
    appInfo: {
      name: 'immoradar',
      version: '0.0.1',
      url: 'immoradar.co.at',
    },
  },
);

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

// async function createCustomer(req: Request, res: Response): Promise<void> {
//   const customer = await stripe.customers.create({ email: req.body.email });

//   // User und ID in Datenbank speichern
//   res.cookie('customer', customer.id, { maxAge: 900000, httpOnly: true });

//   res.send({ customer });
// }

async function createCheckout(req: Request, res: Response): Promise<void> {
  try {
    const prices = await stripe.prices.list({
      lookup_keys: [req.body.lookup_key],
      expand: ['data.product'],
    });
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      billing_address_collection: 'auto',
      line_items: [
        {
          price: prices.data[1].id,
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:8080/success',
      cancel_url: 'http://localhost:8080/cancel',
    });
    // console.log(session.url);
    // res.redirect(303, session.url as string);
    // return session.url as any;
    res.status(200).send(session.url);
  } catch (error) {
    return console.error(error);
  }
}

async function createPortal(req: Request, res: Response): Promise<void> {
  // VOn Datenbank holen
  const { session_id } = req.body;
  const checkout_session = await stripe.checkout.sessions.retrieve(session_id);

  const returnUrl = 'http://localhost:8080/home';

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: checkout_session.customer as string,
    return_url: returnUrl,
  });
  res.status(200).send(portalSession.url);
}

// async function createSubscription(req: Request, res: Response): Promise<void> {
//   // Stripe Customer ID --> Authenticated user
//   const customerId = req.cookies['customer'];

//   const priceId = req.body.priceId;

//   try {
//     const subscription = await stripe.subscriptions.create({
//       customer: customerId,
//       items: [{ price: priceId }],
//       payment_behavior: 'default_incomplete',
//       expand: ['latest_invoice.payment_intent'],
//     });
//     res.send({ subscriptionId: subscription.id });
//   } catch (error) {
//     res.status(400).send(error);
//   }
// }

async function config(req: Request, res: Response): Promise<void> {
  res.send({
    publishableKey: process.env.PUBLIC_KEY,
    basicPrice: process.env.BASIC_PRICE_ID,
    proPrice: process.env.PRO_PRICE_ID,
  });
}

async function checkoutSession(req: Request, res: Response): Promise<void> {
  const { sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId as any);
  res.send(session);
}

export {
  postToWebhook,
  // createCustomer,
  createCheckout,
  createPortal,
  // createSubscription,
  config,
  checkoutSession,
};
