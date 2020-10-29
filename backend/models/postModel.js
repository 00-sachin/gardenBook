
var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    postCreator: String,
    postBody: String,
    postTime: Date,
    likes: Array,
    comments: Array
});

exports.Posts = mongoose.model('Posts', postSchema);