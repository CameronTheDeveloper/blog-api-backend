const express = require('express');
const router = express.Router();

const controller = require('../controllers/blogPostController');

// Root route for blog posts
router.get('/', controller.blogPost_list);


// Route for creating blog posts
router.post('/', controller.blogPost_post);

// Routes for specific blogpost operations
router.get('/:blogpostId', (req, res, next) => {
    res.send('GET blogpost by ID - not implemented');
});

router.put('/:blogpostId', controller.blogPost_put);

router.delete('/:blogpostId', controller.blogPost_delete);

module.exports = router;