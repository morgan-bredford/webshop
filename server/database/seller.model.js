const mongoose = require('mongoose')

const Schema = mongoose.Schema

const sellerSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    products: {
        type: Array
    }
},
{
    timestamps: true
}
)

const Seller = mongoose.model('wbseller', sellerSchema)

module.exports = Seller