const express = require('express');
const router = express.Router();

// Root route for users
router.get('/', function (req, res, next) {
  res.send('GET users - not implemented');
});


// Route for creating users
router.post('/', (req, res, next) => {
  res.send('POST create user - not implemented');
});

// Routes for specific user operations
router.get('/:userId', (req, res, next) => {
  res.send('GET user by ID - not implemented');
});

router.put('/:userId', (req, res, next) => {
  res.send('PUT user by ID - not implemented');
});

router.delete('/:userId', (req, res, next) => {
  res.send('DELETE user by ID - not implemented');
});

module.exports = router;
