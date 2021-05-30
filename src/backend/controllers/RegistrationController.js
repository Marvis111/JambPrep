const {User,enroleStatus} = require('../models/database');
const bcrypt = require('bcrypt');
const ValidateForm = require('../utils/formValidation'),
//jwt
jwt = require('jsonwebtoken');
const {jwtSecret }= require('../config/config');

//
const RegController = {
    getSignUpData: async (req,res,next) =>{
        //do not skip the next middleware..
        req.skip = false;
        //get the req body;
        const {Fullnames,Email,Password,CPassword} = req.body;
        const formState = ValidateForm(req.body);
        if(formState.errNo > 0){
            req.skip = true;
            req.dataError = formState;
            next();
        }else{
            //don't skip the next middleware..
            req.skip = false;
            try{
               const hashPassword = await bcrypt.hash(Password,10);
              User.create({
                    Fullnames,Email,Password:hashPassword
                }).then(user =>{
                //jwt
                jwt.sign({id:user._id},jwtSecret,{expiresIn: 3600},
                    (err,token)=>{
                       if(err){
                            req.skip = true;
                            req.dataError =  {success:false,error:[{
                                FieldName:"Email",
                                err:"Error Processing user data."
                            }]};
                            next();
                        }else{
                            enroleStatus.create({userId:user._id,enroleStatus:false}).then((potentialEnroller =>{
                                if(potentialEnroller){
                                    req.skip = false;
                                req.headers['x-auth-token'] = token;
                                req.session.Fullnames = user.Fullnames;
                                req.session.Email = user.Email;
                                req.session.UserId = user._id;
                                next();
                                }
                            })).catch(err =>{
                                req.skip = true;
                            req.dataError =  {success:false,error:[{
                                FieldName:"Email",
                                err:"Error Processing user data."
                            }]};
                            next();
                            });
                            
                            
                        }
                    });

                }).catch(error =>{
                     req.skip = true;
                   if(error.code === 11000){
                       req.dataError =  {success:false,error:[{
                        FieldName:"Email",
                        err:"Email already exist."
                    },{FieldName:"Password",err:""}]}
                       next();
                   }
                });
            }catch(err){    
                if (err) {
                    console.log(err);
                    req.skip = true;
                    next();
                }
            }
        }
    },
    createCookies:(req,res,next) =>{
        if(req.skip){
            next();
        }else{
            res.cookie('Fullnames',req.session.Fullnames);
            res.cookie('UserId',req.session.UserId);
            next();
        }
    }
    ,
    sendSuccess:(req,res,next) =>{
        if(req.skip){
            next();
        }else{
            const newUser = {
                success:true,
                token:req.headers['x-auth-token'],
                UserId:req.session.UserId,
                Fullnames:req.session.Fullnames,
                Email:req.session.Email,
            }
            res.send(newUser);
           
        }
    },
    sendFailed:(req,res) =>{
        if(req.dataError){
            res.send(req.dataError);
        }
    },
    getLoginData: async (req,res,next) =>{
        req.skip = false;
        const {Email,Password} = req.body;
        const formState = ValidateForm(req.body);
        if(formState.errNo > 0){
            req.dataError = formState;
            req.skip = true;
            next();
        }else{
            try{
                    const user = await User.findOne({Email});
                if(user !== null){
                const result = await bcrypt.compare(Password,user.Password);
                    if(result == true){
                        req.skip = false;
                        jwt.sign({id:user._id},jwtSecret,{expiresIn:3600},(err,token)=>{
                            if(err){
                                req.skip = true;
                                req.dataError =  {success:false,error:[{
                                    FieldName:"Email",
                                    err:"Error Processing user data."
                                }]}
                                next();
                            }
                            else{
                            
                                req.skip = false;
                                req.headers['x-auth-token'] = token;
                                req.session.Fullnames = user.Fullnames;
                                req.session.Email = user.Email;
                                req.session.UserId = user._id;
                                next();
                            }
                           
                        })
                      
                    }else{
                        req.skip = true;
                    req.dataError = {success:false,error:[{
                        FieldName:"Email",
                        err:"Wrong Email/Password combination."
                    }]}
                    next();
                    }

                }else{
                    req.skip = true;
                    req.dataError = {success:false,error:[{
                        FieldName:"Email",
                        err:"Wrong Email/Password combination."
                    }]}
                    next();
                }
            }catch(err){
                console.log(err)
            }
        }
    },
}
module.exports = RegController;