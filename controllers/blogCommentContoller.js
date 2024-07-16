const BlogComment = require('../models/blogComment');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.blog_comments_get = asyncHandler(async (req, res, next) => {
    const blogComments = await BlogComment.find({ post: req.params.id }).exec();

    res.json({
        message: 'Comments',
        comment_list: blogComments
    });
});