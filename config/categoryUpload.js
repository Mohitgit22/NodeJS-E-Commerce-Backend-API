import cloudinaryPackage from "cloudinary";

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import dotenv from 'dotenv'
dotenv.config();

//configure cloudinary
const cloudinary = cloudinaryPackage.v2;
cloudinary.config({
    cloud_name: process.env.CLOUNDINARY_CLOUD_NAME,
    api_key: process.env.CLOUNDINARY_API_KEY,
    api_secret: process.env.CLOUNDINARY_API_SECRET_KEY,
});

//Create storage engine from Multer
const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png'],
    params: {
        folder: "blog-api",
    },
});

//Init Multer with the storage engine
const categoryFileUpload = multer({ storage: storage});

export default categoryFileUpload;