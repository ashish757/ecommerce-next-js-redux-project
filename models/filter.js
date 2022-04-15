import mongoose from "mongoose";
const filterSchema =  new mongoose.Schema({
    filter: String,
    value: String
})

const filtersSchema = new mongoose.Schema({
    category: String,
    filters: [filterSchema]
})

const Filter = mongoose.models.filters || mongoose.model('filters', filtersSchema)

export default Filter