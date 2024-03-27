// product Schema
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        ref: "Category",
        required: true,
    },
    sizes: {
        type: [String],
        enum: ["S", "M", "L", "XL", "XXL"],
        required: true,
    },
    colors: {
        type: [String],
        required: true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    images: [
        {
            type: String,
          
        },
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    price: {
        type: Number,
        required: true,
    },
    totalQty: {
        type: Number,
        required: true,
    },
    totalSold: {
        type: Number,
        required: true,
        default: 0,
    },
},
    {
        timestamps: true,     //auto generated date
        toJSON: { virtuals: true },
    }
);


//Virtuals ==> are properties that does not persist on the record in our database but on quering we can have that property on our model
//Total Rating
ProductSchema.virtual('totalReviews').get(function() {//gives total no. of reviews for a product
   const product = this;
   return product?.reviews?.length;
})
//average rating
ProductSchema.virtual('averageRating').get(function() {
    let ratingsTotal = 0;
    const product = this;
    product?.reviews?.forEach((review)=>{
        ratingsTotal += review?.rating;
    });
    //calc average rating
    const averageRating = Number(ratingsTotal / product?.reviews?.length).toFixed(1);
    return averageRating;
})


//qty left
ProductSchema.virtual('qtyLeft').get(function() {
    const product = this
    return product.totalQty-product.totalSold;
})

const Product = mongoose.model("Product", ProductSchema);

export default Product;

