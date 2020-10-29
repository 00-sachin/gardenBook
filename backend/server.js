
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const user = require('./models/user');
const auth = require('./routes/auth');
const posts = require('./routes/posts');

const app = express();
app.use(bodyParser());
app.use(cors());

app.use('/auth', auth);
app.use('/post', posts);

//connecting to database
var url = "mongodb+srv://sachin:sachin@123@cluster0.2zkgd.mongodb.net/gardenBook?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser:true, useUnifiedTopology:true});
mongoose.connection.on('connected', () => console.log('connected'));
mongoose.connection.on('error', err => console.log('error while connecting',err));

// user.saveUser({
// 	userName: 'sachin',
// 	email: 'skp',
// 	password: '123'
// });



// usersHere = {
// sachinG: {
// 			email: "sachin23pandey@gmail.com",
// 			password: "123",
// 			following: ['sachinR'],
// 			followers: ['sachinR'],
// 			posts: [{
// 				postBody:  'post1G',
// 				likes: 4,
// 				comments:['comment1', 'comment2', 'comment3']
// 			},
// 			{
// 				postBody:  'post2G',
// 				likes: 15,
// 				comments:['comment1', 'comment2', 'comment3']
// 			}]
// 		 },
// sachinR: {
// 			email: "sachin23pandey@rediffmail.com",
// 			password: "123",
// 			following: ['sachinG'],
// 			followers: ['sachinG'], 
// 			posts: [{
// 				postBody:  'post1R',
// 				likes: 2,
// 				comments:['comment1.1', 'comment2.1', 'comment3.1']
// 			},
// 			{
// 				postBody:  'post2R',
// 				likes: 5,
// 				comments:['comment1.1', 'comment2.1', 'comment3.1']
// 			}]
// 		 }
// };

// app.get('/login', (req, res) => {
// 	let email = req.query.email;
// 	let password = req.query.password;
// 	console.log(email, password);
// 	let validator = [];
// 	Object.keys(users).forEach(item => {
// 		if (users[item].email === email && users[item].password === password) validator.push(item);
// 	})
// 	if (validator.length == 1 && validator[0] !== undefined) {
// 		console.log(validator[0]);
// 		res.send( {username: validator[0]} );
// 	} else res.send({username: undefined})
// });

// app.get('/posts', (req, res) => {
// 	var user = req.query.username;
// 	//console.log(myProfile[0].posts);
// 	res.send({posts: user.posts});
// });

// app.get('/postsOfFollowings', (req, res) => {
// 	var user = req.query.username;
// 	let releventPosts = users[user].following.map(singleFollowing => {
// 		return users[singleFollowing].posts;
// 	});
// 	console.log(releventPosts);
// 	res.send({posts: releventPosts});
// })

// app.get('/profile', (req, res) => {
// 	var user = req.query.username;
// 	//console.log(user);
// 	let userPosts = users[user].posts.map(item => item.postBody);
// 	let followers = users[user].followers.length;
// 	let following = users[user].following.length;
// 	let sendable = {
// 		posts: userPosts,
// 		followers: followers,
// 		following: following
// 	}
// 	console.log(sendable);
// 	res.send(sendable);
// });

app.listen(3001, () => {
	console.log('server started!');
});