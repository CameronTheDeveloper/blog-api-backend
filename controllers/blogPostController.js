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

exports.blogPost_detail = asyncHandler(async (req, res, next) => {
    const blogPost = await BlogPost.findById(req.params.id).exec();

    if (blogPost === null) {
        const err = new Error("Blog Post not found");
        err.status = 404;
        return next(err);
    }

    res.json({
        message: 'Blog Post',
        blogPost: blogPost
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

exports.blogPost_put = [
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
            _id: req.params.id
        });

        if (!errors.isEmpty()) {
            res.json({
                message: 'Error filling out blog post form',
                blogPost: blogPost,
                errors: errors.array()
            });
        } else {
            const updatedBlogPost = await BlogPost.findByIdAndUpdate(req.params.id, blogPost, {});
            res.json({
                message: 'Updated blog post',
                blogPost: updatedBlogPost
            });
        }
    })
];

exports.blogPost_delete = asyncHandler(async (req, res, next) => {
    try {
        const blogPost = await BlogPost.findById(req.params.id);

        if (!blogPost) {
            return res.status(404).json({ message: 'Blog Post not found' });
        }

        await BlogPost.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Blog Post deleted' });
    } catch (err) {
        next(err);
    }
});