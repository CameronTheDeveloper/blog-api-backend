const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Root route for users
router.get('/', userController.users_get);


// Route for creating users
router.post('/', userController.user_post);

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
