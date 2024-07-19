const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Root route for users
router.get('/', userController.users_get);

router.post('/login', userController.user_login_post);


// Route for creating users
router.post('/', userController.user_post);

// Routes for specific user operations
router.get('/:userId', (req, res, next) => {
  res.send('GET user by ID - not implemented');
});

router.put('/:userId', userController.user_put);

router.delete('/:userId', userController.user_delete);

module.exports = router;
