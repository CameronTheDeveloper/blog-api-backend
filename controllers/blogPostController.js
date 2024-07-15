const BlogPost = require('../models/blogPost');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.blogPost_list = asyncHandler(async (req, res, next) => {
    const blogPosts = await BlogPost.find().exec();

    res.json({
        message: 'Blogs',
        blogPost_list: blogPosts
    });
});
