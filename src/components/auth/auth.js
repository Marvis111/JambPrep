import axios from "../config/axios";

class Auth{
    constructor(){
        this.isAuthenticated = false;
        this.isImportant = false;
    };


    SignIn(user,cb){
        for(let userdata in user){
            if(userdata !=='token'){
                sessionStorage.setItem(userdata,user[userdata]);
            }else{
                localStorage.setItem('token',user.token);
            }
        };
        this.isAuthenticated = true;
        cb();
    }
    login(logInUser,cb){
        for(let userdata in logInUser){
            if(userdata !=='token'){
                sessionStorage.setItem(userdata,logInUser[userdata]);
            }
        };
            localStorage.setItem('token',logInUser.token);
            this.isAuthenticated = true;
        cb();
    }
    logout(cb){
        sessionStorage.clear();
        this.isAuthenticated = false;
        cb();
    }
    AuthenticatedUser(){
        if(sessionStorage.length){
         const Fullnames = sessionStorage.getItem('Fullnames');
         const Email = sessionStorage.getItem('Email');
         const UserId = sessionStorage.getItem('UserId');
         return {Fullnames,Email,UserId};

        }
    }

    Authenticated(){
        return this.isAuthenticated;
        
    }
  

async Important(userId,cb){
  const res = await axios({url:"/checkstatus",method:'POST',data:{userId}});
    cb(res.data);
    }  
}
export default new Auth();