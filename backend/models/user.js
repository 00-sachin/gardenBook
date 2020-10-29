
const mongoose = require('mongoose');

// user schema
var userSchema = new mongoose.Schema({
	userName: String,
	email: String,
	password: String,
	followers: Array,
	following: Array,
	posts: Array
});

exports.User = mongoose.model("User", userSchema);
