const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


exports.user_post = [
    body('username')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Username must be specified')
        .escape()
        .isAlphanumeric()
        .withMessage('Username has non-alphanumeric characters'),
    body('userPassword')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Username must be specified')
        .escape()
        .isAlphanumeric()
        .withMessage('Username has non-alphanumeric characters'),

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
                bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
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