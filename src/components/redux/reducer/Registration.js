import { DISTRIBUTE_ERROR, LOGIN, SIGNUP } from "../actions/actionType";


const InitialsignUpFieldValues = {
    Fullnames:"",
    Email:"",
    Password:"",
    CPassword:""
};
export const SignUpReducer = (state = InitialsignUpFieldValues, action) =>{
switch (action.type) {
    case SIGNUP:
        return action.payload
        break;
    default:
        return state
        break;
}
}

const initialFieldError = {
    Fullnames:"",
    Email:'',
    Password:'',
};
export const distributeErrorReducer = (state = initialFieldError,action) =>{
    switch (action.type) {
        case DISTRIBUTE_ERROR:
            return {
                ...state,
               [action.payload.FieldName]:action.payload.err
            }
            break;
    
        default:
            return state;
            break;
    }
    
}

const initilaLoginField = {
    Email:"",
    Password:"",
}
export const LoginReducer = (state = initilaLoginField,action) =>{
    switch (action.type) {
        case LOGIN:
            return action.payload
            break;
        default:
            return state
            break;
    }
}
