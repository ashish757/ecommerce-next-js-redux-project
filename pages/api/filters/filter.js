import connectDb from "../../../utils/mongodb"
import Product from '../../../models/product'

export default async function handler(req, res) {
    await connectDb()
    if (req.method === "POST") {

        // {rating: [], category: []}
        //  {asd: [filters]}
        const filters = req.body.filters
            
        
        const productsQuery = Product.find()
        if (filters.category) productsQuery.where("category").equals(filters["category"])
        if (filters.rating) productsQuery.where('rating.rate').gt(filters["rating"])

        // const products = await Product.find({ category: categoryFilters })

        const products = await productsQuery.exec()

        console.log("FETCHED FILTERED");
        res.json({ status: true, products })
    }

}