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

exports.blog_comment_post = [
    body('commentText', 'Comment must have characters')
        .trim()
        .isLength({ min: 1 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const comment = new BlogComment({
            text: req.body.commentText,
            author: req.body.author._id,
            post: req.params.id
        });

        if (!errors.isEmpty()) {
            res.json({
                message: 'Comment input error',
                comment: comment,
                errors: errors.array()
            });
        } else {
            await comment.save();
            res.json({
                message: 'Comment posted',
                comment: comment
            });
        }
    })
];