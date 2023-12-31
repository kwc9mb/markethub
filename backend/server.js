const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const marketRoutes = require('./routes/market');
const userRoutes = require('./routes/user');
const vendorRoutes = require('./routes/vendor');

const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Existing middleware and routes
app.use('/api/markets', marketRoutes);
app.use('/api/users', userRoutes);
app.use('/api/vendors', vendorRoutes);

// 404 Handler for unmatched routes
app.use((req, res) => {
    res.status(404).send('404: Page not found');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
