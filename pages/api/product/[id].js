import Product from "../../../models/product"
import connectDb from "../../../utils/mongodb"

export default async function handler(req, res) {
    await connectDb()

    const {id} = req.query

    const product = await Product.findById(id);
    console.log("FETCHED PRODUCT");

    res.json({status: true, product})
}