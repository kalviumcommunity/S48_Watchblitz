// server.js

require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;
const mongoURI = process.env.MONGODB_URI;
const cors = require('cors')
const UserModel = require('./models/Watchlists')

app.use(cors())
app.use(express.json())

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

app.get("/mongo", (req,res)=>{
    const connection = mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";
    res.send(`Database connection status : ${connection}`)
})

app.get('/getWatchlists',(req,res)=> {
    UserModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
})


if (require.main === module) {
    app.listen(port, () => {
        console.log(`🚀 server running on PORT: ${port}`);
    });
}

app.post('/addWatchlist', (req, res) => {
    const newEntity = new UserModel(req.body);
    newEntity.save()
        .then(entity => res.json(entity))
        .catch(error => res.status(400).json({ error }));
});


module.exports = app;



