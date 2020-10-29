
var express = require('express');
var router = express.Router();
var user = require('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var authCheck = require('../middlewares/authCheck');

router.get('/signup',(req, res) => {
    var password = bcrypt.hashSync(req.query.password, 10);
    user.User.findOne({
        email: req.query.email})
        .then(  result => {
                if (result) res.send('already exists');
                if (result === null) {
                    const newUser = new user.User(
                        {
                            email: req.query.email,
                            password: password
                        }
                    );
                    console.log(newUser);
                    newUser.save(err => {
                    if (err) return err;
                    console.log('user data saved');
                    res.send('user saved');
                });
                };      
            })
        .catch(err => err)
});

router.get('/login', (req, res) => {
    var email = req.query.email;
    user.User.findOne({
        email: email
    }).then(result => {
        console.log(result);
        if (!result) res.send({token: undefined});
        if (result && bcrypt.compareSync(req.query.password, result.password)) {        
            var token = jwt.sign({email: email}, "this is it");
            res.send({
                token: token,
                email: result.email
            });
        }
    }).catch(err => err)
})

router.get('/protected', authCheck,(req, res) => {
    res.send('access to protected content');
})

module.exports = router;
