
var jwt = require('jsonwebtoken');

var authCheck = (req, res, next) => {
    const {authorization} = req.headers;
    if (!authorization) return res.send('no token');
    var token = authorization.replace('Bearer ','');
    jwt.verify(token,'this is it', (err, payload) => {
        if (err) return res.send('login first');
        //console.log(payload);
        next();
    });
    
}

module.exports = authCheck;