import connectDb from "../../../utils/mongodb"
import Filter from '../../../models/filter'

export default async function handler(_req, res) {
    await connectDb()

    const filters = await Filter.find()
    console.log("FETCHED ALL FILTERS");
    res.json({status: true, filters: filters})
}