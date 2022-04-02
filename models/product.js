import mongoose from "mongoose";

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
    rating: {
        type: Number,
        required: true
    },
    delivery: {
        type: String,
    }
})

const Product = mongoose.models.products || mongoose.model('products', productSchema)

export default Product