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



//db Connect
dbConnect();
const app = express();  


//pass incoming data
app.use(express.json());


//routes
app.use('/api/v1/users/', userRoutes);
app.use('/api/v1/products/', productsRouter);
app.use('/api/v1/categories/', categoriesRouter);
app.use('/api/v1/brands/', brandsRouter);
app.use('/api/v1/colors/', colorRouter);
app.use('/api/v1/categories/', categoriesRouter);

//err middlewares
app.use(notFound);
app.use(globalErrhandler);

export default app;

// M61qXH3Go8WHWBbE
//Mongo db password

//connection string
// mongodb+srv://mohitverma77377:<password>@nodejs-ecommerce-api.sqx6czr.mongodb.net/