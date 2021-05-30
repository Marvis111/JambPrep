import { DISTRIBUTE_ERROR, LOGIN, SIGNUP } from "./actionType"


export const SignUpAction = (Fullnames,Email,Password,CPassword) =>{
    return{
        type:SIGNUP,
        payload:{Fullnames,Email,Password,CPassword}
    };
};

export const distributeInputError = (fields) =>{
    return{
        type:DISTRIBUTE_ERROR,
        payload: fields
    }
}
//{fieldName:"err msg"};
export const LoginAction = (Email,Password) =>{
    return{
        type:LOGIN,
        payload:{Email,Password}
    }
}
