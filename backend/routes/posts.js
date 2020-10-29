
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
        return User.find({email: { $in: followingArray } }, {posts: 1} )
        })

    .then((relevantPosts) => {
        console.log('relevant',relevantPosts)
        res.send({posts: relevantPosts})
    })     
});

module.exports = router;