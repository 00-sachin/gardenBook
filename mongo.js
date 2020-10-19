
const mongoDb = require('mongodb');

var MongoClient = mongoDb.MongoClient;
var url = "mongodb://127.0.0.1:27017/db";

var connect = () => {
	MongoClient.connect(url, { useUnifiedTopology: true }, async (err,db) => {
		if (err) throw err;
		console.log("connection established!", db);
		await db.db();
		return db;
  	});
  	
};

exports.connect = connect;

