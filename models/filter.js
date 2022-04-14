import mongoose from "mongoose";

const filterSchema = new mongoose.Schema({
    filter: String
})

const Filter = mongoose.models.filters || mongoose.model('filters', filterSchema)

export default Filter