import Product from "../../../models/product"
import connectDb from "../../../utils/mongodb"

export default async function handler(req, res) {
    await connectDb()

    const {id} = req.query

    const product = await Product.findOne({_id: id});

    res.json({status: true, product})
}