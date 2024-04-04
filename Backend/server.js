require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Joi = require('joi');

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI;

// Models
const WatchlistsModel = require('./models/Watchlists');
const UsersModel = require('./models/Users');

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Routes

// Get database connection status
app.get("/mongo", (req, res) => {
    const connection = mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";
    res.send(`Database connection status : ${connection}`)
});

// Watchlists Routes

// Get all watchlists
app.get('/getWatchlists', (req, res) => {
    WatchlistsModel.find()
        .then(watchlists => res.json(watchlists))
        .catch(err => res.json(err))
});

// Add a new watchlist
const watchlistSchema = Joi.object({
    name: Joi.string().required(),
    brand: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    features: Joi.string().required()
});

app.post('/addWatchlist', (req, res) => {
    const { error } = watchlistSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const newWatchlist = new WatchlistsModel(req.body);
    newWatchlist.save()
        .then(watchlist => res.json(watchlist))
        .catch(error => res.status(400).json({ error }));
});

// Update a watchlist
app.put('/updateWatchlist/:id', (req, res) => {
    const { id } = req.params;
    const { name, brand, price, description, features } = req.body;
    WatchlistsModel.findByIdAndUpdate(id, { name, brand, price, description, features })
        .then(() => res.json({ message: 'Watchlist updated successfully' }))
        .catch(error => res.status(400).json({ error }));
});

// Delete a watchlist
app.delete('/deleteWatchlist/:id', (req, res) => {
    const { id } = req.params;
    WatchlistsModel.findByIdAndDelete(id)
        .then(() => res.json({ message: 'Watchlist deleted successfully' }))
        .catch(error => res.status(400).json({ error }));
});

// Users Routes

// Get all users
app.get('/getUsers', (req, res) => {
    UsersModel.find()
        .then(users => res.json(users))
        .catch(err => res.json(err))
});

// Define Joi schema for user signup data
const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().required()
});

// Add a new user
app.post('/addUser', (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const newUser = new UsersModel(req.body);
    newUser.save()
        .then(user => res.json(user))
        .catch(error => res.status(400).json({ error }));
});

// Define Joi schema for user login data
const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});

// User login
app.post('/login', async (req, res) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    
    const data = req.body;

    // Check if user exists in the database
    const user = await UsersModel.findOne({ username: data.username, password: data.password })
    if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }
    // For demonstration, let's assume successful login and return a success message
    res.json({ message: 'Login successful', username:data.username });
});

    // Logout route to clear the cookie
app.post('/logout', (req, res) => {
    // Clear username cookie upon logout
    res.clearCookie('username', { path: '/login' }); // Specify the path where the cookie was set
    
    // Return a success message
    res.json({ message: 'Logout successful' });
});



// Start server
if (require.main === module) {
    app.listen(port, () => {
        console.log(`🚀 Server running on PORT: ${port}`);
    });
}

module.exports = app;
