import asyncHandler from  "express-async-handler";
import Brand from "../model/Brand.js";

// @desc Create new Brand
// @route POST /api/v1/brands
// @access Private/Admin

export const createBrandCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;
    //brand exists already
    const brandFound = await Brand.findOne({ name });
    if(brandFound) {
        throw new Error (" Brand already exists");
    }
    //create
    const brand = await Brand.create({
        name: name.toLowerCase(),
        user: req.userAuthId,
    });

    res.json({
        status: "success",
        message: "Brand successfully created",
        brand,
    });
});

// @desc GET all Brand
// @route GET /api/brands
// @access Public

export const getAllBrandsCtrl = asyncHandler(async(req, res) => {
    const brands = await Brand.find();
    res.json({
        status: "success",
        message: "Successfully fetched brands",
        brands
    });
});


// @desc GET single Brand
// @route GET /api/brands/:id
// @access Public

export const getSingleBrandCtrl = asyncHandler(async(req, res) => {
    const brand = await Brand.findById(req.params.id);
    res.json({
        status: "success",
        message: "brand fetched Successfully",
        brand
    });
});

// @desc Update Brand
// @route PUT  /api/brands/:id
// @access Private/Admin

export const updateBrandCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;
    //update
    const brand = await Brand.findByIdAndUpdate(req.params.id, 
        {
          name,
    },
    {
        new: true,
    });
    res.json({
        status: "success",
        message: " brand updated successfully",
        brand,
    });
});


// @desc Delete Brand
// @route DELETE  /api/brands/:id
// @access Private/Admin

export const deleteBrandCtrl = asyncHandler(async (req, res) => {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    res.json({
        status: "success",
        message: " brand deleted successfully",
    });
});




