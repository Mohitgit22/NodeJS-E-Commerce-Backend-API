import express from "express";
import { createProductCtrl,
         getProductsCtrl,
         getProductCtrl ,
         updateProductCtrl,
         deleteProductCtrl
        } from "../controllers/productCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedin.js";

const productsRouter = express.Router();

productsRouter.post("/",isLoggedIn, createProductCtrl);
productsRouter.get("/",isLoggedIn, getProductsCtrl);
productsRouter.get("/:id",isLoggedIn, getProductCtrl);
productsRouter.put("/:id",isLoggedIn, updateProductCtrl);
productsRouter.delete("/:id/delete",isLoggedIn, deleteProductCtrl);

export default productsRouter;
