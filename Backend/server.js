const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://bhouvana:FO5KzR5350F6kKPN@cluster0.0equbxr.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
  app.get('/', (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
    res.send(`Database connection status: ${dbStatus}`);
  });
  const express = require('express');
const app = express();
const port = process.env.PUBLIC_PORT || 3000; 

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 Server running on PORT: ${port}`);
  });
}

module.exports = app;
