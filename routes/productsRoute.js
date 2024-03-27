import express from "express";
import upload from "../config/fileUpload.js";
import { createProductCtrl,
         getProductsCtrl,
         getProductCtrl ,
         updateProductCtrl,
         deleteProductCtrl
        } from "../controllers/productCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedin.js";
import isAdmin from "../middlewares/isAdmin.js";
const productsRouter = express.Router();

productsRouter.post("/",isLoggedIn, isAdmin,upload.array("files"),createProductCtrl);
productsRouter.get("/",isLoggedIn, getProductsCtrl);
productsRouter.get("/:id",isLoggedIn, getProductCtrl);
productsRouter.put("/:id",isLoggedIn, isAdmin,updateProductCtrl);
productsRouter.delete("/:id/delete",isLoggedIn, isAdmin,deleteProductCtrl);

export default productsRouter;
