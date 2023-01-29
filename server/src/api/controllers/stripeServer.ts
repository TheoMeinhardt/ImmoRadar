import { Request, Response } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe: Stripe = new Stripe(process.env.SECRET_KEY ? process.env.SECRET_KEY : '', {
  apiVersion: '2022-08-01',
  appInfo: {
    name: 'immoradar',
    version: '0.0.1',
    url: 'https://immoradar.onrender.com/',
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
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful!');
      console.log(paymentIntent);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      console.log('PaymentMethod was attached to a Customer!');
      console.log(paymentMethod);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
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
      line_items: [
        {
          price: prices.data[1].id,
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:8080/#/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:8080/cancel',
    });
    res.status(200).send(session);
    console.log(session.url);
  } catch (error) {
    return console.error(error);
  }
}

// async function createPortal(req: Request, res: Response): Promise<void> {
//   const { session } = req.body;
//   // const session_id = session.id;
//   const checkout_session = session;
//   const returnUrl = 'http://localhost:8080';

//   const portalSession = await stripe.billingPortal.sessions.create({
//     customer: checkout_session.customer as string,
//     return_url: returnUrl,
//   });
//   res.status(200).send(portalSession.url);
// }

// async function checkoutSession(req: Request, res: Response): Promise<void> {
//   const { session_id } = req.params;
//   console.log(session_id);
//   const session = await stripe.checkout.sessions.retrieve(session_id);
//   res.status(200).send(session);
// }

export { postToWebhook, createCheckout };
