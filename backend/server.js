const express = require('express');
const cors = require('cors');
const userRoutes = require('/routes/userRoutes.js');
const createDatabase = require('../backend/routes/userdb.js');

const app = express();
const port = 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Adjust this URL to match your frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
app.use(express.json());
app.use('/users', userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
