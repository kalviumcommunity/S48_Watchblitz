const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    brand: String,
    price : String,
    description: String,
    features: Array,
})

const UserModel = mongoose.model("watchlists", UserSchema)
module.exports = UserModel
