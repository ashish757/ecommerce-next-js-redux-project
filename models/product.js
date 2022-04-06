import mongoose from "mongoose";
const ratingSchema = new mongoose.Schema({
    rate: Number,
    count: Number
})
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        required: true,
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String
    },
    description: {
        type: String
    },
    rating:  ratingSchema
})

const Product = mongoose.models.products || mongoose.model('products', productSchema)

export default Product