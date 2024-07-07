const express = require('express');
const router = express.Router();

// Root route for blog posts
router.get('/', function (req, res, next) {
    res.send('GET blogposts - not implemented');
});


// Route for creating blog posts
router.post('/', (req, res, next) => {
    res.send('POST create blogpost - not implemented');
});

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