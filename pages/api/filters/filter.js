import connectDb from "../../../utils/mongodb"
import Product from '../../../models/product'

export default async function handler(req, res) {
    await connectDb()
    if (req.method === "POST") {

        const categoryFilters = req.body.category

        const products = await Product.find().where("category").equals(categoryFilters)
        // const products = await Product.find({ category: categoryFilters })

        console.log("FETCHED FILTERED");
        res.json({ status: true, products })
    }

}