const { User,enroleStatus } = require('../models/database');
const Auth = require('./Auth');


module.exports = {
    checkUser:async (req,res,next) =>{
        const userId = req.UserId
      const user = await User.findOne({_id:userId});
      req.session.Fullnames = user.Fullnames;
      req.session.Email = user.Email,
      req.session.UserId = user._id;
      next();
    },
    sendAuthenticatedUser : (req,res,next) =>{
        const AuthenticatedUser = {
            success:true,
            token:req.headers['x-auth-token'],
            UserId:req.session.UserId,
            Fullnames:req.session.Fullnames,
            Email:req.session.Email,
        }
      res.send(AuthenticatedUser);  
    },
    checkRegister: async (req,res,next) =>{
      const userId = req.body.userId;
        try{
          const checkUserEnrollStatus = await enroleStatus.findOne({userId});
          if(checkUserEnrollStatus.enroleStatus === false){
            req.enroleStatus = false;
            next();
          }else{
            req.enroleStatus = true;
            next();
          }
        }catch(err){
          if(err){
            console.log(err);
          }
        }
        next();
    },
    sendStatus:(req,res,next) =>{
        res.send(req.enroleStatus);
      next();
    },

}