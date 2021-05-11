const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    firstname: {
        type: String,
        trim: true,
    },
    lastname: {
        type: String,
        trim: true,
    },
    adress: {
        type: String,
        trim: true,
    },
    admin: {
        type: Boolean
    }
},
{
    timestamps: true
}
)

const User = mongoose.model('wbuser',userSchema)

module.exports = User