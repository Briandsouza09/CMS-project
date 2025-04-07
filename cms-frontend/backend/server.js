// server.js
const app = require('./app');
const http = require('http');
const pool = require('./config/db'); // Import the pool directly

const port = process.env.PORT || 5000;
const server = http.createServer(app);

// Test database connection
pool.getConnection()
  .then(connection => {
    console.log('Connected to MySQL database');
    connection.release(); // Release the connection back to the pool
    
    // Start server
    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });