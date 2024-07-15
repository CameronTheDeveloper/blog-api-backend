const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Root route for users
router.get('/', userController.users_get);

router.get('/login', userController.user_login);


// Route for creating users
router.post('/', userController.user_post);

// Routes for specific user operations
router.get('/:userId', (req, res, next) => {
  res.send('GET user by ID - not implemented');
});

router.put('/:userId', userController.user_put);

router.delete('/:userId', (req, res, next) => {
  res.send('DELETE user by ID - not implemented');
});

module.exports = router;
