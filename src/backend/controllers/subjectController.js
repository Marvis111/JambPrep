
const {Subject, UserSbj,User, enroleStatus} = require('../models/database');
const reg = require('../utils/functions');
module.exports = {
    fetchSubjects: async (req,res,next) =>{
        try{
            const subjects = await Subject.find({});
            req.subjects = subjects;
            next();
        }catch(err){
            console.log(err);
        }
    },
    sendSubject:(req,res) =>{
        if(req.subjects){
            res.send(req.subjects);
        }
    },
    getUserSubject: async (req,res,next) =>{
        req.success = false;
        const userData = reg(req.body);
        const {userId} = userData;
        try{
            const res = await UserSbj.create(userData);
            const enrolUser = await enroleStatus.updateOne({userId,},{$set:{enroleStatus:true}});

            if(res && enrolUser.ok === 1){
            req.success = true;
            }
        }catch(err){
            if(err){
                req.success = false;
                next(err);
            }
        }
        next()
    },
    saved:(req,res) =>{
        const data = {success:req.success};
        res.send(data);
    },
    fetchUserSubjects: async (req,res,next)=>{
        const {userId} = req.body;
        const userSbj = await UserSbj.findOne({userId});
        req.userRecentSubject = userSbj.UserSbjts;
        next();
    },sendUserSubject:(req,res) =>{
        if(req.userRecentSubject){
            res.send(req.userRecentSubject);
        }

    }
}