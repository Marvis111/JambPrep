const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/config');

module.exports = (req,res, next)=>{
    const token = req.headers['x-auth-token'];

    jwt.verify(token,jwtSecret,(err,user)=>{
        if(err){
            res.send({
                success:false
            });
        }
        if(user && user !== undefined){
            req.UserId = user.id;
            next();
        }
    })
};