import Product from "../model/Product.js";
import asyncHandler from "express-async-handler";


// @desc Create new Product
// @route  POST /api/v1/products
// @access Private/Admin

export const createProductCtrl = asyncHandler(async (req, res) => {
    const { name, description, category, sizes, colors, user, price, totalQty, brand } = req.body;
    // for admin user only


    //Product exists
    const productExists = await Product.findOne({ name });
    if (productExists) {
        throw new Error("Product already exists");
    }

    //create the product
    const product = await Product.create({
        name,
        description,
        category,
        sizes,
        colors,
        user: req.userAuthId,
        price,
        totalQty,
        brand
    });
    // push the product into category

    //send response
    res.json({
        status: "success",
        message: "Product created successfully",
        product,
    });

})

// @desc Get Product
// @route  GET /api/v1/products
// @access Public

export const getProductsCtrl = asyncHandler(async (req, res) => {
    //query
    let productQuery = Product.find();

    //search by name
    if (req.query.name) {
        productQuery = productQuery.find({
            name: { $regex: req.query.name, $options: "i" },
        })
    }


    //filter by brand
    if (req.query.brand) {
        productQuery = productQuery.find({
            brand: { $regex: req.query.brand, $options: "i" },
        })
    }
    //filter by category
    if (req.query.category) {
        productQuery = productQuery.find({
            category: { $regex: req.query.category, $options: "i" },
        })
    }
    //filter by color
    if (req.query.colors) {
        productQuery = productQuery.find({
            colors: { $regex: req.query.colors, $options: "i" },
        })
    }
    //filter by sizes
    if (req.query.size) {
        productQuery = productQuery.find({
            sizes: { $regex: req.query.size, $options: "i" },
        })
    }
    //filter by price range
    if (req.query.price) {
        const priceRange = req.query.price.split("-");
        // using gte:greater than or equal
        // using lte:less than or equal
        productQuery.find({
            price: { $gte: priceRange[0], $lte: priceRange[1] },
        });
    }

    //pagination
    //page
    const page = parseInt(req.body.page) ? parseInt(req.query.page) : 1;
    //limit
    const limit = parseInt(req.body.limit) ? parseInt(req.query.limit) : 10;
    //startIdx
    //page 1: 1-10, page 2: 11-20, page 3: 21-30
    const startIndex = (page - 1) * limit;
    //endIdx
    const endIndex = page * limit;
    //total
    const total = await Product.countDocuments();


    productQuery = productQuery.skip(startIndex).limit(limit);
    //.limit = Specifies the maximum number of documents the query will return.
    //.skip = Specifies the number of documents to skip.

    //pagination results
    const pagination = {};

    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit,
        };
    }
    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit,
        };
    }


    //await the query
    const products = await productQuery;

    res.json({
        status: "success",
        total,
        results: products.length,
        pagination,
        message: "Products fetched successfully",
        products,
    });
});

// @desc Get Single Product
// @route  GET /api/products/:id
// @access Public

export const getProductCtrl = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        throw new Error('Product not found')
    }
    res.json({
        status: 'success',
        message: 'Product fetched successfully',
        product,
    })
});


// @desc Update Product
// @route  PUT /api/products/:id/update
// @access Private/Admin

export const updateProductCtrl = asyncHandler(async (req, res) => {
    const { name, description, category, sizes, colors, user, price, totalQty, brand } = req.body;

    const product = await Product.findByIdAndUpdate(req.params.id, {
        name,
        description,
        category,
        sizes,
        colors,
        user,
        price,
        totalQty,
        brand
    },{
        new: true,
    });

    res.json({
        status: success,
        message: "Product updated successfully",
        product,
    })
});


// @desc delete Product
// @route  DELETE /api/products/:id/delete
// @access Private/Admin

export const deleteProductCtrl = asyncHandler(async(req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);

     res.json({
        status: 'success',
        message: "Product updated successfully",
    })
})