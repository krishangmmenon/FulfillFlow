const { Pool } = require('pg');

// Create a new connection pool
const pool = new Pool({
  host: process.env.POSTGRES_HOST,       // Host from .env
  port: process.env.POSTGRES_PORT,       // Port from .env
  user: process.env.POSTGRES_USER,       // DB user
  password: process.env.POSTGRES_PASSWORD, // DB password
  database: process.env.POSTGRES_DB,     // DB name
});

// Test the connection
pool.connect()
  .then(() => console.log('✅ Connected to PostgreSQL!'))
  .catch(err => console.error('❌ PostgreSQL connection error:', err));

module.exports = pool; // Export for use in other files
