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

router.put('/:blogpostId', (req, res, next) => {
    res.send('PUT blogpost by ID - not implemented');
});

router.delete('/:blogpostId', (req, res, next) => {
    res.send('DELETE blogpost by ID - not implemented');
});

module.exports = router;