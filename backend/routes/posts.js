
const express = require('express');
const router = express.Router();
const authCheck = require('../middlewares/authCheck');
const postModel = require('../models/postModel');
const { User } = require('../models/user');

router.post('/createPost', authCheck, (req, res) => {   
    var newPost = {
        postTitle: req.body.title,
        postImageUrl: req.body.imageUrl,
        postBody: req.body.postBody,
        postTime: Date.now(),
        likes: [],
        comments: []
    };
    console.log(newPost);
    User.update({email: req.body.email}, { $push: {posts: newPost} }, (err, success) =>{
        if (err) res.send(err);
        if (success) res.send('post saved');
    });   
});

router.get('/relevantPosts', authCheck, (req, res) => { 
    
    User.findOne({email: req.query.username})
    .then(result => {
        console.log('result',result);
        return result.following
    })

    .then( followingArray => {
        return User.find({email: { $in: followingArray } }, {posts: 1, email:1} )
        })

    .then((relevantPosts) => {
        console.log('relevant',relevantPosts)
        res.send({posts: relevantPosts})
    })     
});

router.get('/like', authCheck, (req, res) => {
    var postId = req.query.postId;
    var liker = req.query.username;

    User.findOne( {'posts.postId': postId}, {'posts.$.likes':1} )
    .then(result =>  {
        console.log('result',result)
        var likedArray = result.posts[0].likes;
        console.log(likedArray)
        var liked;

        likedArray.map(item => {
            if (item === liker) liked= true;
        });
        console.log(liked);
        if(liked === true){
            var removable = likedArray.indexOf(liker);
            likedArray.splice(removable, 1);
            console.log(likedArray);
            User.updateOne( {'posts.postId': postId}, { $set: {'posts.$.likes': likedArray} },
            (err, success) => {
                if(err) console.log(err);
                else console.log(success); 
            } )
            res.send({status:true})
        }
        
        else {
            likedArray.push(liker);
            console.log(likedArray);
            User.updateOne( {'posts.postId': postId}, { $set: {'posts.$.likes': likedArray} },
            (err, success) =>{
                if(err) console.log(err);
                else console.log(success);
            } )
            res.send({status:false});}
        }

    )
})

module.exports = router;
