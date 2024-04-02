const mongoose = require('mongoose')

const WatchlistSchema = new mongoose.Schema({
    name: String,
    brand: String,
    price : String,
    description: String,
    features: Array,
})

const WatchlistModel = mongoose.model("watchlists", WatchlistSchema)
module.exports = WatchlistModel
