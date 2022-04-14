import mongoose from "mongoose";

// const cartSchema = new mongoose.Schema({
//     product: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "products"
//     },
//     quantity: Number
// })

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        required: true,
        type: String
    },
    cartCount: Number,
    cart: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products"
        },
        quantity: Number
    }] 
})

const User = mongoose.models.users || mongoose.model('users', usersSchema)

export default User