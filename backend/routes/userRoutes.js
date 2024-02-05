const express = require('express');
const router = express.Router();

// In-memory array to store users
let users = [];

router.post('/register', (req, res) => {
  // Assuming req.body contains the user data from the registration form
  const newUser = req.body;
  
  // Logic to handle user registration
  users.push(newUser);
  
  res.json({ message: 'User registered successfully' });
});

router.post('/login', (req, res) => {
  // Logic to handle user login
  res.json({ message: 'User logged in successfully' });
});

router.get('/users', (req, res) => {
  // Return the list of users
  res.json({ users });
});

module.exports = router;
