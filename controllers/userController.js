const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


exports.users_get = asyncHandler(async (req, res, next) => {
    const users = await User.find({}, { password: 0, _id: 0 }).exec();

    res.json({
        message: 'List of users',
        user_list: users
    });
});

exports.user_post = [
    body('username')
        .trim()
        .isLength({ min: 3 })
        .withMessage('Username must be 3+ characters long')
        .escape()
        .isAlphanumeric()
        .withMessage('Username has non-alphanumeric characters'),
    body('userPassword')
        .trim()
        .isLength({ min: 8 })
        .withMessage('Password must be 8+ characters long')
        .escape(),
    body('confirmUserPassword')
        .trim()
        .custom((value, { req }) => {
            return value === req.body.userPassword;
        })
        .withMessage('Password does not match confirmed password'),


    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);


        if (!errors.isEmpty()) {

            const user = new User({
                username: req.body.username,
                isBlogAuthor: false
            });

            res.json({
                user: user,
                errors: errors.array(),
            });
        } else {
            try {
                bcrypt.hash(req.body.userPassword, 10, async (err, hashedPassword) => {
                    if (err) {
                        return next(err);
                    } else {
                        const user = new User({
                            username: req.body.username,
                            password: hashedPassword,
                            isBlogAuthor: false,
                        });
                        await user.save();

                        res.json({
                            user: user,
                            message: 'User Created'
                        });
                    }
                });
            } catch (err) {
                return next(err);
            }

        }
    })

];