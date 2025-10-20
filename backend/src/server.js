require('dotenv').config(); // Load .env variables
console.log('Postgres password from .env:', process.env.POSTGRES_PASSWORD);

const pool = require('./utils/db');
const { producer, consumer } = require('./utils/redpanda');
const redis = require('./utils/redis');
const express = require('express'); // Import Express
const cors = require('cors');  // Import Cors
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000; // Use PORT from .env or default 3000
const orderRoutes = require('./routes/orders');

app.use('/orders', orderRoutes);


// Middleware
app.use(express.json()); // Parse incoming JSON requests

// Test route
app.get('/', (req, res) => {
  res.send('FulfillFlow Backend is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// Test Redis by setting and getting a key
redis.set('test-key', 'Hello FulfillFlow', (err) => {
  if (err) console.error('Redis set error:', err);
  else {
    console.log('✅ Redis test-key set successfully');

    redis.get('test-key', (err, value) => {
      if (err) console.error('Redis get error:', err);
      else console.log('Redis test-key value:', value);
    });
  }
});
