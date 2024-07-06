const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: { type: String, required: true, maxLength: 100 },
    text: { type: String, required: true, maxLength: 9000 },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    isPublished: { type: Boolean, required: true, default: false },
}, { timestamps: true });

BlogPostSchema.virtual('url').get(function () {
    return `/blogpost/${this._id}`;
});

module.exports = mongoose.model('BlogPost', BlogPostSchema);