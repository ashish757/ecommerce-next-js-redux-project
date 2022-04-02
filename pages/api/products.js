import Product from "../../models/product"
import connectDb from "../../utils/mongodb"

export default async function handler(req, res) {
    await connectDb()

    const products = await Product.find();

    res.json({status: true, products})
}