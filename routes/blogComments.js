const express = require('express');
const router = express.Router();

const controller = require('../controllers/blogCommentContoller');

// Route for specific blog post comments
router.get('/', controller.blog_comments_get);


// Route for creating comments
router.post('/', controller.blog_comment_post);

// Routes for specific comment operations
router.get('/:commentId', (req, res, next) => {
    res.send('GET comment by ID - not implemented');
});

router.put('/:commentId', controller.blog_comment_put);

router.delete('/:commentId', (req, res, next) => {
    res.send('DELETE comment by ID - not implemented');
});

module.exports = router;