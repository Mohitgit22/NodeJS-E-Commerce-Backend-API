import express from 'express';
import dotenv from "dotenv";
dotenv.config();

import dbConnect from '../config/dbConnect.js';
import userRoutes from '../routes/usersRoute.js';
import { globalErrhandler, notFound } from "../middlewares/globalErrHandler.js"
import productsRouter from "../routes/productsRoute.js";
import categoriesRouter from "../routes/categoriesRouter.js";
import brandsRouter from "../routes/brandsRouter.js";
import colorRouter from "../routes/colorRouter.js";
import reviewRouter from '../routes/reviewRouter.js';
import orderRouter from '../routes/orderRouter.js';


import Stripe from 'stripe';


//db Connect
dbConnect();
const app = express();  


//pass incoming data
app.use(express.json());




//Stripe Webhook
//stripe instance
const stripe = new Stripe(process.env.STRIPE_KEY);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_e28676df35e6f5d1e3e7513241c1de7802cdc7cd506ef91f3ecf4d3205ce03bb";

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];//for security purpose whether the req is coming from stripe

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    console.log(event);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }




  // Handle the event
//   switch (event.type) {
//     case 'payment_intent.succeeded':
//       const paymentIntentSucceeded = event.data.object;
//       // Then define and call a function to handle the event payment_intent.succeeded
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   // Return a 200 response to acknowledge receipt of the event
//   response.send();
});









//routes
app.use('/api/v1/users/', userRoutes);
app.use('/api/v1/products/', productsRouter);
app.use('/api/v1/categories/', categoriesRouter);
app.use('/api/v1/brands/', brandsRouter);
app.use('/api/v1/colors/', colorRouter);
app.use('/api/v1/categories/', categoriesRouter);
app.use('/api/v1/reviews/', reviewRouter);
app.use('/api/v1/orders/', orderRouter);




//err middlewares
app.use(notFound);
app.use(globalErrhandler);

export default app;

// M61qXH3Go8WHWBbE
//Mongo db password

//connection string
// mongodb+srv://mohitverma77377:<password>@nodejs-ecommerce-api.sqx6czr.mongodb.net/