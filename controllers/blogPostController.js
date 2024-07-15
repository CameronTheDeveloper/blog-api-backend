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

exports.blogPost_post = [
    body('blogTitle')
        .trim()
        .escape()
        .isLength({ min: 1 })
        .withMessage('Title is required'),
    body('blogText')
        .trim()
        .escape()
        .isLength({ min: 1 })
        .withMessage('Text is required'),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const blogPost = new BlogPost({
            title: req.body.blogTitle,
            text: req.body.blogText,
            author: req.user._id,
            isPublished: false,
        });

        if (!errors.isEmpty()) {
            res.json({
                message: 'Error filling out blog post form',
                blogPost: blogPost,
                errors: errors.array()
            });
        } else {
            await blogPost.save();
            res.json({
                message: 'Created Blog Post',
                blogPost: blogPost
            });
        }
    })
];
