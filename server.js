
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoDb = require('mongodb');

const app = express();
app.use(bodyParser());
app.use(cors());

//var mongo = require ('./mongo');
//var books = require('./books'); 
//var movies = require('./movies'); 

var mongoClient = mongoDb.MongoClient;
var url = "mongodb://localhost:27017/gardenBook";
var users, dbo;

usershere = {
sachinG: {
			email: "sachin23pandey@gmail.com",
			password: "123",
			following: ['sachinR'],
			followers: ['sachinR'],
			posts: [{
				postBody:  'post1G',
				likes: 4,
				comments:['comment1', 'comment2', 'comment3']
			},
			{
				postBody:  'post2G',
				likes: 15,
				comments:['comment1', 'comment2', 'comment3']
			}]
		 },
sachinR: {
			email: "sachin23pandey@rediffmail.com",
			password: "123",
			following: ['sachinG'],
			followers: ['sachinG'], 
			posts: [{
				postBody:  'post1R',
				likes: 2,
				comments:['comment1.1', 'comment2.1', 'comment3.1']
			},
			{
				postBody:  'post2R',
				likes: 5,
				comments:['comment1.1', 'comment2.1', 'comment3.1']
			}]
		 }
};

mongoClient.connect(url, { useUnifiedTopology: true }, (err,db) => {
	if (err) {
		console.log(err);
	} else{
	console.log("connection established!");}
	dbo = db.db("gardenBook");
	
	dbo.collection("users").findOne({}, function(err, result) {
		if (err) throw err;
		console.log(result);
		users = result;
	  });
});

app.get('/login', (req, res) => {
	let email = req.query.email;
	let password = req.query.password;
	console.log(email, password);
	let validator = [];
	Object.keys(users).forEach(item => {
		if (users[item].email === email && users[item].password === password) validator.push(item);
	})
	if (validator.length == 1 && validator[0] !== undefined) {
		console.log(validator[0]);
		res.send( {username: validator[0]} );
	} else res.send({username: undefined})
});

app.get('/posts', (req, res) => {
	var user = req.query.username;
	//console.log(myProfile[0].posts);
	res.send({posts: user.posts});
});

app.get('/postsOfFollowings', (req, res) => {
	var user = req.query.username;
	let releventPosts = users[user].following.map(singleFollowing => {
		return users[singleFollowing].posts;
	});
	console.log(releventPosts);
	res.send({posts: releventPosts});
})

app.get('/profile', (req, res) => {
	var user = req.query.username;
	//console.log(user);
	let userPosts = users[user].posts.map(item => item.postBody);
	let followers = users[user].followers.length;
	let following = users[user].following.length;
	let sendable = {
		posts: userPosts,
		followers: followers,
		following: following
	}
	console.log(sendable);
	res.send(sendable);
});

app.listen(3001, () => {
	console.log('server started!');
});