import { Request, Response } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const stripe: Stripe = new Stripe(SECRET_KEY as string, {
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
      cancel_url: 'http://localhost:8080/cancel',
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

async function checkoutSession(req: Request, res: Response): Promise<void> {
  try {
    const { session_id } = req.params;
    const stripeSession = await stripe.checkout.sessions.retrieve(session_id);
    if (stripeSession === null || stripeSession === undefined) {
      res.status(400).json('Invalid session ID');
      return;
    }
    res.status(200).json(stripeSession);
  } catch (error: any) {
    res.status(200).json(error.type);
  }
}

// StripeInvalidRequestError
export { postToWebhook, createCheckout, createPortal, checkoutSession };
