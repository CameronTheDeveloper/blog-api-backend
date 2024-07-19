require('dotenv').config();

const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const jwtPassword = process.env.JWT_SECRET_KEY;


async function hashPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                reject(err);
            } else {
                resolve(hashedPassword);
            }
        });
    });
}

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
                const hashedPassword = await hashPassword(req.body.userPassword);
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
            } catch (err) {
                return next(err);
            }
        }
    })
];

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await User.findOne({ username: username });
            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            };
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: "Incorrect password" });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        };
    })
);

exports.user_login_post = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
});

exports.user_put = [
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
                const hashedPassword = await hashPassword(req.body.password);

                const user = new User({
                    username: req.body.username,
                    password: hashedPassword,
                    isBlogAuthor: false,
                    _id: req.params.id
                });

                const updatedUser = await user.findByIdAndUpdate(req.params.id, user, {});

                res.json({
                    message: 'User Updated',
                    user: updatedUser
                });
            } catch (err) {
                return next(err);
            }
        }
    })
];

exports.user_delete = asyncHandler(async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        next(err);
    }
});