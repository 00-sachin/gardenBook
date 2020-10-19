
const mongo = require('./mongo');

var allBooks = async () => {
	await mongo.connect();
	var books = async () => await mongo.db.collection("books").find({}).toArray();
	return books;
}

exports.allBooks = allBooks;