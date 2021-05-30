const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/JambPrep",
{useNewUrlParser:true,
useUnifiedTopology:true});

const db = mongoose.connection;

db.once('open', ()=>{
    console.log("Successfully connected to Database");
});
//user schema
const userSchema = mongoose.Schema({
    Fullnames:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true
    }
})
//subject schema... 
const subjectSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    }
})
// usersubject schema

const userSubjectsSchema = mongoose.Schema({
    userId:{type:String,require:true},
    UserSbjts:{type:Array,require:true},
    userDept:{type:String,require:true}
})

const userStatus = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    enroleStatus:{
        type:Boolean,
        require:true
    }
})


const UserSbj = mongoose.model('userSbj',userSubjectsSchema);
const User = mongoose.model('Users',userSchema);
const Subject = mongoose.model('subjects',subjectSchema);
const enroleStatus = mongoose.model('enrolStatus',userStatus);

module.exports = {
    User,
    Subject,
    UserSbj,
    enroleStatus,
}