const express = require('express');
const router = express.Router();

// Root route for blog posts
router.get('/', function (req, res, next) {
    res.send('GET blogposts - not implemented');
});


// Routes for creating blog posts
router.get('/create', (req, res, next) => {
    res.send('GET create blogpost - not implemented');
});

router.post('/create', (req, res, next) => {
    res.send('POST create blogpost - not implemented');
});

// Routes for specific blogpost operations
router.get('/blogpost/:blogpostId', (req, res, next) => {
    res.send('GET blogpost by ID - not implemented');
});

router.put('/blogpost/:blogpostId', (req, res, next) => {
    res.send('PUT blogpost by ID - not implemented');
});

router.delete('/blogpost/:blogpostId', (req, res, next) => {
    res.send('DELETE blogpost by ID - not implemented');
});
