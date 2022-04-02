import mongoose from 'mongoose'

let connection = null

const connectDb = async () => {
    if (connection) {
        console.log("used existing connection");
        return connection
    } 

    try {
        connection = await mongoose.connect(process.env.MONGODB_URI)
        console.log("created a connection");
        return connection
        // console.log("CLIENT", await client);
    } catch (error) {
        console.log("error connecting mongoose", error);
    }
}

export default connectDb
