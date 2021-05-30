const Auth = require("../controllers/Auth");
const RegController = require("../controllers/RegistrationController");
const subjectController = require("../controllers/subjectController");
const userController = require("../controllers/userController");


const Router = app =>{
    app.post('/signup',
    RegController.getSignUpData,RegController.sendSuccess,RegController.sendFailed)
    app.post('/login',RegController.getLoginData,RegController.createCookies,RegController.sendSuccess,RegController.sendFailed)
    app.post('/checkuser',Auth,userController.checkUser,userController.sendAuthenticatedUser);
    app.post('/fetchsubjects',subjectController.fetchSubjects,subjectController.sendSubject);
    app.post("/saveusersbj",subjectController.getUserSubject,subjectController.saved);
    app.post('/checkstatus',userController.checkRegister,userController.sendStatus);
    app.post('/fetchrecentsubjects',subjectController.fetchUserSubjects,subjectController.sendUserSubject);
}

module.exports = Router;