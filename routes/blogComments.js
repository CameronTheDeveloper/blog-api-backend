const express = require('express');
const router = express.Router();

// Root route for comments
router.get('/', function (req, res, next) {
    res.send('GET comments - not implemented');
});


// Routes for creating comments
router.get('/create', (req, res, next) => {
    res.send('GET create comment - not implemented');
});

router.post('/create', (req, res, next) => {
    res.send('POST create comment - not implemented');
});

// Routes for specific comment operations
router.get('/comment/:commentId', (req, res, next) => {
    res.send('GET comment by ID - not implemented');
});

router.put('/comment/:commentId', (req, res, next) => {
    res.send('PUT comment by ID - not implemented');
});

router.delete('/comment/:commentId', (req, res, next) => {
    res.send('DELETE comment by ID - not implemented');
});
