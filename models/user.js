import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        required: true,
        type: String
    },
    cart: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "products"
    }
})

const User = mongoose.models.users || mongoose.model('users', usersSchema)

export default User