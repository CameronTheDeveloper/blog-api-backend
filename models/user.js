const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, minLength: 3, maxLength: 40 },
    password: { type: String, required: true, minLength: 8, maxLength: 999 },
    isBlogAuthor: { type: Boolean, required: true },
});

UserSchema.virtual('url').get(function () {
    return `/user/${this._id}`;
});

module.exports = mongoose.model('User', UserSchema);