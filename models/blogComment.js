const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogCommentSchema = new Schema({
    text: { type: String, required: true, maxLength: 1000 },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    post: { type: Schema.Types.ObjectId, ref: 'BlogPost', required: true }
}, { timestamps: true });

BlogCommentSchema.virtual('url').get(function () {
    return `/comment/${this._id}`;
});

module.exports = mongoose.model('BlogComment', BlogCommentSchema);