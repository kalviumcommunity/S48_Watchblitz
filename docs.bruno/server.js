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
  