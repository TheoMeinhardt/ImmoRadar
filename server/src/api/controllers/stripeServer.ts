import { Request, Response } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

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
      success_url: 'http://localhost:8080/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:8080/cancel',
    });
    res.status(200).send(session);
  } catch (error) {
    return console.error(error);
  }
}

async function createPortal(req: Request, res: Response): Promise<void> {
  // VOn Datenbank holen
  console.log('test');
  const { session_id } = req.body;
  console.log('test2');
  const checkout_session = await stripe.checkout.sessions.retrieve(session_id);
  console.log('test3');
  const returnUrl = 'http://localhost:8080';

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: checkout_session.customer as string,
    return_url: returnUrl,
  });
  res.status(200).send(portalSession.url);
}

async function checkoutSession(req: Request, res: Response): Promise<void> {
  const { sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId as any);
  res.status(200).send(session);
}

export { postToWebhook, createCheckout, createPortal, checkoutSession };
